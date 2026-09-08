import { z } from 'zod';
import { NodeId } from '../domain/node';

// --- moveNode: PATCH /ndrive/node/:id/move ---
export const MoveNodeParams = z.object({ id: NodeId });
export type MoveNodeParams = z.infer<typeof MoveNodeParams>;

export const MoveNodeBody = z.object({
  parentId: NodeId.optional(),
});
export type MoveNodeBody = z.infer<typeof MoveNodeBody>;

export const MoveNodeResponse = z.object({
  affectedCount: z.number(),
  affectedIds: z.array(z.uuid()),
});
export type MoveNodeResponse = z.infer<typeof MoveNodeResponse>;
