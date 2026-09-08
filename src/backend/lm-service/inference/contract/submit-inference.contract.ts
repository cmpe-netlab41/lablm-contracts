import { z } from 'zod';
import { LmInference } from '../domain/inference';

// --- submitInference: POST /lm-service/inferences ---
export const SubmitInferenceBody = z.object({
  externalRequestId: z.string().min(1).max(255),
  requestedModelId: z.string().min(1),
  // OpenAI-compatible payload passthrough — intentionally not narrowed to local
  // DTOs so new upstream fields don't require a contract change. Mirrors
  // InferenceEngineWriteRequest.payload on the machine-service side.
  payload: z.unknown(),
  stream: z.boolean().default(false),
});
export type SubmitInferenceBody = z.infer<typeof SubmitInferenceBody>;

// Describes the non-streaming response body and the final persisted record.
// When `stream: true`, the HTTP response is SSE byte passthrough from
// machine-service instead of this JSON shape — see ADR-0001, "Transport".
export const SubmitInferenceResponse = LmInference;
export type SubmitInferenceResponse = z.infer<typeof SubmitInferenceResponse>;
