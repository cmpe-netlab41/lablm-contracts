import { z } from 'zod';
import { StringFilter } from '../../../common/filter';
import { listQuery, listResponse } from '../../../common/list';
import { Node, NodeId } from '../domain/node';

// --- listNodes: GET /ndrive/node ---
export const NodeFilter = z.object({
  name: StringFilter.optional(),
  kind: StringFilter.optional(),
  status: StringFilter.optional(),
});
export type NodeFilter = z.infer<typeof NodeFilter>;

export const ListNodesQuery = listQuery(NodeFilter).extend({
  parentId: NodeId.optional(),
  scope: z.enum(['children', 'drive']).optional(),
});
export type ListNodesQuery = z.infer<typeof ListNodesQuery>;

export const ListNodesResponse = listResponse(Node);
export type ListNodesResponse = z.infer<typeof ListNodesResponse>;
