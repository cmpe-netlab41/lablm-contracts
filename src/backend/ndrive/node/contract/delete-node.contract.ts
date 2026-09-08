import { z } from 'zod';
import { NodeId } from '../domain/node';

// --- deleteNode: DELETE /ndrive/node/:id (204, no response body; soft delete / trash) ---
export const DeleteNodeParams = z.object({ id: NodeId });
export type DeleteNodeParams = z.infer<typeof DeleteNodeParams>;
