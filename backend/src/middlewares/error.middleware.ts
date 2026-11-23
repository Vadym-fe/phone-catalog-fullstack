import type { Request, Response, NextFunction } from 'express';
import { AppError } from './app-error';

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
        statusCode: error.statusCode,
      },
    });
  }

  return res.status(500).json({
    error: {
      message: 'An unexpected error occurred',
      statusCode: 500,
    },
  });
}
