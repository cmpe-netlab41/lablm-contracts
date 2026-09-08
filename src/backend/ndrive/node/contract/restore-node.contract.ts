import { z } from 'zod';
import { NodeId } from '../domain/node';

// --- restoreNode: PATCH /ndrive/node/:id/restore ---
export const RestoreNodeParams = z.object({ id: NodeId });
export type RestoreNodeParams = z.infer<typeof RestoreNodeParams>;

export const RestoreNodeResponse = z.object({
  affectedCount: z.number(),
  affectedIds: z.array(z.uuid()),
});
export type RestoreNodeResponse = z.infer<typeof RestoreNodeResponse>;
