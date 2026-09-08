import { z } from 'zod';

export const InferenceHealthSchema = z.object({
     status: z.literal('ok'),
});

export type InferenceHealthResponse = z.infer<typeof InferenceHealthSchema>;
