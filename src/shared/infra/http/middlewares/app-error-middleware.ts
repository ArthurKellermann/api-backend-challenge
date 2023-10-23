import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/app-error';

export function appErrorMiddleware(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error - ' + err.message,
  });
}
