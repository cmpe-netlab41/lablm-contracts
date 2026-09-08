import { z } from 'zod';

export const InferenceOperationTokenSchema = z.object({
     jti: z.string().min(1),
     exp: z.number().int().positive(),
     iat: z.number().int().nonnegative().optional(),
}).strict();

export type InferenceOperationToken = z.infer<typeof InferenceOperationTokenSchema>;
