import { z } from 'zod';
import { NodeId } from '../domain/node';

// --- renameNode: PATCH /ndrive/node/:id/rename ---
export const RenameNodeParams = z.object({ id: NodeId });
export type RenameNodeParams = z.infer<typeof RenameNodeParams>;

export const RenameNodeBody = z.object({
  name: z.string().min(1).max(255),
});
export type RenameNodeBody = z.infer<typeof RenameNodeBody>;

export const RenameNodeResponse = z.object({
  affectedCount: z.number(),
  affectedIds: z.array(z.uuid()),
});
export type RenameNodeResponse = z.infer<typeof RenameNodeResponse>;
