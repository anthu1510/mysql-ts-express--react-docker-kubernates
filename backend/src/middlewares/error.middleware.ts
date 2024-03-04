import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode ?? 500;
  res.status(statusCode ?? 500).json({
    error: statusCode,
    message: err.message
  });
  next();
};
