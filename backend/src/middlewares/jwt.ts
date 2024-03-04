import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthRequest } from '../validations/user.validation';

export interface AuthRequest extends Request {
    user?: IAuthRequest
  }

export const generateaccessToken = (payload: IAuthRequest): string => {
  return jwt.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: '15m' });
};

export const generaterefreshToken = (payload: IAuthRequest): string => {
  return jwt.sign(payload, String(process.env.REFRESH_TOKEN_SECRET), { expiresIn: '7d' });
};

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void | Response<{error: string}> => {
    const token = req.header('Authorization');
 
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
 
    jwt.verify(token.split(' ')[1], String(process.env.ACCESS_TOKEN_SECRET), (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }
 
        req.user = user as IAuthRequest;
        return next();
    });
};
