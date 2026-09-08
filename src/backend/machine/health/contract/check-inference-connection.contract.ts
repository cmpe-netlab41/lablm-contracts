import { z } from 'zod';

// --- checkInferenceConnection: GET /machine/health/:id/inference-connection ---
export const CheckInferenceConnectionQuery = z.object({
     port: z.number().int().min(1).optional(),
     protocol: z.enum(['http', 'https']).optional(),
});
export type CheckInferenceConnectionQuery = z.infer<typeof CheckInferenceConnectionQuery>;

export const CheckInferenceConnectionResult = z.object({
     connection: z.boolean(),
     status: z.number().optional(),
     data: z.unknown().optional(),
     error: z.string().optional(),
});
export type CheckInferenceConnectionResult = z.infer<typeof CheckInferenceConnectionResult>;
