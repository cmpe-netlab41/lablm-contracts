import { z } from 'zod';

export const SimErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});

export type SimError = z.infer<typeof SimErrorSchema>;
