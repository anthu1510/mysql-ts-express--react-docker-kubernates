import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthRequest } from '../types';

export interface AuthRequest extends Request {
    user?: IAuthRequest
  }

export interface ITokens {
  accessToken: string,
  refreshToken: string
}

export const generateaccessToken = (payload: IAuthRequest): string => {
  return jwt.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: '15m' });
};

export const generaterefreshToken = (payload: IAuthRequest): string => {
  return jwt.sign(payload, String(process.env.REFRESH_TOKEN_SECRET), { expiresIn: '7d' });
};

export const generateTokens = (payload: IAuthRequest): ITokens => {
    const tokens: ITokens = {
      accessToken: generateaccessToken(payload),
      refreshToken: generaterefreshToken(payload),
    };
    return tokens;
}

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
