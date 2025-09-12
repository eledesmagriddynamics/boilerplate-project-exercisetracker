import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError, DatabaseError } from '../errors';
import { mapDatabaseError } from '../utils/dataBaseErrorMapper';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Ideally log this on non production environments
  console.error('Debug Error:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  const mappedError = mapDatabaseError(error);

  if (mappedError instanceof AppError) {
    res.status(mappedError.statusCode).json({ error: mappedError.message });
    return;
  }

  if (mappedError instanceof ZodError) {
    res.status(400).json({ 
      error: 'Validation failed',
      details: mappedError.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    });
    return;
  }

  if (mappedError instanceof DatabaseError) {
    res.status(mappedError.statusCode).json({ error: mappedError.message });
    return;
  }
  
  res.status(500).json({ error: 'Internal server error' });
};