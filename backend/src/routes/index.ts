import { Application } from 'express';
import userRouter from './user.route';

export const routes = (app: Application) => {
  app.use('/api/users', userRouter);
};
