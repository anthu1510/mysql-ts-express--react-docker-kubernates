import { Request, Response, NextFunction } from 'express';
import env from '../utils/validateEnv';
import { db } from '../databases';
import hashPwd from 'password-hash';
import { generateTokens } from '../middlewares/jwt';
import { IUserCreateInput, ILoginResponse, ILoginRequestBody, IUser, IUsers, IUserGetbyIdSchema } from '../types';

class UserController {
  async getAll(req: Request, res: Response<IUsers>, next: NextFunction) {
    try {
      const users = await db.users.findMany({
        select: {
          id: true,
          roleId: true,
          name: true,
          email: true,
          status: true,
          createdAt: true,
          updatedAt: true
        }
      });
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request<IUserGetbyIdSchema>, res: Response<IUser>, next: NextFunction) {
    try {
      const user = await db.users.findUnique({
        where: { id: Number(req.params.id) },
        select: {
          id: true,
          roleId: true,
          name: true,
          email: true,
          status: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (user) res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request<IUserCreateInput>, res: Response, next: NextFunction) {
    try {
      const userData: IUserCreateInput = req.body;
      const user = await db.users.create({
        data: { ...userData, password: hashPwd.generate(req.body.password) }
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request<ILoginRequestBody>, res: Response<ILoginResponse>, next: NextFunction) {
    try {
      const { email, password }: ILoginRequestBody = req.body;
      const isValidUser = await db.users.findUnique({ where: { email } });
      if (!isValidUser) {
        throw Error('This email not is the Data source');
      } else {
        const isValidDetail = hashPwd.verify(password, isValidUser?.password);
        if (!isValidDetail) {
          throw Error('Password not matched');
        } else {
          const tokenPayload = {
            userId: isValidUser.id,
            name: isValidUser.name,
            roleId: isValidUser.roleId
          };
          const response = {
            status: true,
            ...generateTokens(tokenPayload)
          };
          res.cookie('accessToken', response.accessToken, { maxAge: env.COOKIE_EXPIRE_TIME });
          res.cookie('refreshToken', response.refreshToken, { maxAge: env.COOKIE_EXPIRE_TIME });
          res.json(response);
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
