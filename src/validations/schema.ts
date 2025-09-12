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

export const exerciseLogQuerySchema = z.object({
  from: z
    .string()
    .pipe(z.string().date())
    .optional(),
  to: z
    .string()
    .pipe(z.string().date())
    .optional(),
  limit: z
    .coerce.number().positive('Limit must be a positive integer')
    .optional()
}).refine((data) => {
  if (data.from && data.to) {
    return new Date(data.from) <= new Date(data.to);
  }
  return true;
}, {
  message: 'from date must be before or equal to to date',
  path: ['from']
});
