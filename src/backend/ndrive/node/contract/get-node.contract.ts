import { z } from 'zod';
import { Node, NodeId } from '../domain/node';

// --- getNode: GET /ndrive/node/:id ---
export const GetNodeParams = z.object({ id: NodeId });
export type GetNodeParams = z.infer<typeof GetNodeParams>;

export const GetNodeResponse = Node;
export type GetNodeResponse = z.infer<typeof GetNodeResponse>;
