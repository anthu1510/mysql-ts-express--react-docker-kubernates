import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../databases';
import hashPwd from 'password-hash';
import { AuthRequest, generateaccessToken, generaterefreshToken } from '../middlewares/jwt';
import { IUserCreateInput, ILoginResponse, ILoginRequestBody, IUserGetbyIdSchema, IUser, IUsers } from '../validations/user.validation';



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
      if (error instanceof Error) {
        next(error);
      }
    }
  }

  async getById(req: AuthRequest, res: Response<IUser>, next: NextFunction) {
    try {
      const user = await db.users.findUnique({where: {id: Number(req.params.id)}, select: {
        id: true,
        roleId: true,
        name: true,
        email: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }});

      if(user) res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
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
      if (error instanceof Error) {
        next(error);
      }
    }
  }

  async login(req: Request<ILoginRequestBody>, res: Response<ILoginResponse>, next: NextFunction) {
    try {
      const { email, password }: ILoginRequestBody = req.body;
      const isValidUser = await db.users.findUnique({ where: { email } });
      if (!isValidUser) {
        throw new Error('This email not is the Data source');
      } else {
        const isValidDetail = hashPwd.verify(password, isValidUser?.password);
        if (!isValidDetail) {
          throw new Error('Password not matched');
        } else {
          const response = {
            status: true,
            accessToken: generateaccessToken({ userId: isValidUser.id, name: isValidUser.name, roleId: isValidUser.roleId}),
            refreshToken: generaterefreshToken({ userId: isValidUser.id, name: isValidUser.name, roleId: isValidUser.roleId})
          };
          res.json(response);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }

  
}

export default new UserController();
