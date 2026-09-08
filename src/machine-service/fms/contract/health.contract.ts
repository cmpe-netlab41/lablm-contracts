import { z } from 'zod';

export const FmsHealthSchema = z.object({
  status: z.literal('ok'),
});

export type FmsHealthResponse = z.infer<typeof FmsHealthSchema>;
