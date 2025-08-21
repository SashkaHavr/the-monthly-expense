import { z } from 'zod';

export const expenseSchema = z.object({
  amount: z.int().positive(),
  month: z
    .string()
    // YYYY-MM
    .regex(/^\d{4}-\d{2}$/)
    .refine((value) => !Number.isNaN(new Date(value).valueOf()), {
      message: 'Invalid month format',
    }),
  description: z.string().max(200),
});
