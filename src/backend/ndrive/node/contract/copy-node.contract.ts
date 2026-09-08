import { z } from 'zod';
import { NodeId } from '../domain/node';

// --- copyNode: POST /ndrive/node/:id/copy/:destinationId ---
export const CopyNodeParams = z.object({ id: NodeId, destinationId: NodeId });
export type CopyNodeParams = z.infer<typeof CopyNodeParams>;

export const CopyNodeResponse = z.uuid();
export type CopyNodeResponse = z.infer<typeof CopyNodeResponse>;
