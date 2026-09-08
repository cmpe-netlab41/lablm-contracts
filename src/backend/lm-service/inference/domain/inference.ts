import { z } from 'zod';

export const InferenceId = z.uuid().brand<'InferenceId'>();
export type InferenceId = z.infer<typeof InferenceId>;

// Single status authority for an inference — no separate job/attempt status to reconcile.
// Legal transitions: pending->in_progress, pending->failed, in_progress->succeeded,
// in_progress->failed, in_progress->cancelled. No transitions out of a terminal status.
// See ADR-0001 (apps/backend/src/domains/lm-service/_docs) for the full FSM diagram.
export const InferenceStatus = z.enum(['pending', 'in_progress', 'succeeded', 'failed', 'cancelled']);
export type InferenceStatus = z.infer<typeof InferenceStatus>;

export const InferenceFinishReason = z.enum(['stop', 'length', 'content_filter', 'tool_calls', 'error', 'cancelled']);
export type InferenceFinishReason = z.infer<typeof InferenceFinishReason>;

export const LmInference = z.object({
  id: InferenceId,
  // Plain z.uuid(), not a branded cross-domain import — mirrors the existing
  // convention of packages/contracts/src/backend/ndrive/node/domain/node.ts's
  // `ownerId` field, since no cross-domain branded-type import precedent exists
  // in this package.
  userId: z.uuid(),
  externalRequestId: z.string().min(1).max(255),
  requestedModelId: z.string().min(1),
  resolvedModelId: z.string().min(1).nullable(),
  status: InferenceStatus,
  finishReason: InferenceFinishReason.nullable(),
  promptTokens: z.number().int().nonnegative().nullable(),
  completionTokens: z.number().int().nonnegative().nullable(),
  totalTokens: z.number().int().nonnegative().nullable(),
  errorCode: z.string().nullable(),
  errorMessage: z.string().nullable(),
  // Pointer into the Audit Log module's event, not a copy of the prompt/response payload.
  auditEventRef: z.string().nullable(),
  createdAt: z.iso.datetime(),
  dispatchedAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
  // Derived from (completedAt - createdAt); GENERATED ALWAYS AS ... STORED at the
  // database layer, never hand-set. Null until completedAt is set.
  durationMs: z.number().int().nonnegative().nullable(),
});
export type LmInference = z.infer<typeof LmInference>;
