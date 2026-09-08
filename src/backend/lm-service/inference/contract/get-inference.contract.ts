import { z } from 'zod';
import { InferenceId, LmInference } from '../domain/inference';

// --- getInferenceById: GET /lm-service/inferences/:id ---
export const GetInferenceParams = z.object({ id: InferenceId });
export type GetInferenceParams = z.infer<typeof GetInferenceParams>;

export const GetInferenceResponse = LmInference;
export type GetInferenceResponse = z.infer<typeof GetInferenceResponse>;
