import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters')
});

export const exerciseSchema = z.object({
  description: z.string().min(3, 'Description must be at least 3 characters'),
  duration: z.coerce.number().positive('Duration must be a positive integer'), // TODO: Add message for when is not a number
  date: z.string().date().optional()
});