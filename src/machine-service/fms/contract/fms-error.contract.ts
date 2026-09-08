import { z } from 'zod';

export const FmsErrorSchema = z.object({
  statusCode: z.number(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export type FmsError = z.infer<typeof FmsErrorSchema>;
