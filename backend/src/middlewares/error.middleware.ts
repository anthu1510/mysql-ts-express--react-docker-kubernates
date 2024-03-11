import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response) => {
  console.error(err);
  let errorMessage = 'An unknown error occured.';
  if (err instanceof Error) errorMessage = err.message;
  res.status(500).json({ error: true, errorMessage: errorMessage });
};

export const errorEndPointNotFound = (req: Request, res: Response, next: NextFunction) => {
  next(Error('the Endpoint not found.'));
};
