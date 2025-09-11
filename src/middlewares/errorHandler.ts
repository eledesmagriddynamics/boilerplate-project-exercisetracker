import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('errorHandler middleware:', error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({ 
      error: 'Validation failed',
      details: error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    });
    return;
  }
  
  res.status(500).json({ error: 'Internal server error' });
};