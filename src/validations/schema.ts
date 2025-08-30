import { z } from 'zod';
import { getCurrentDate } from '../utils/dateUtils';

export const userSchema = z.object({
  username: z.string().trim().min(3, 'Username must be at least 3 characters'),
});

export const exerciseSchema = z.object({
  description: z
    .string()
    .trim()
    .min(3, 'Description must be at least 3 characters'),
  duration: z.coerce.number().positive('Duration must be a positive integer'),
  date: z
    .string()
    .trim()
    .transform((val) => val === '' ? getCurrentDate() : val)
    .pipe(z.string().date())
    .optional()
    .default(getCurrentDate),
});
