import { z } from 'zod';
import { listQuery, listResponse } from '../../../common/list';
import { Node } from '../domain/node';
import { NodeFilter } from './list-nodes.contract';

// --- listTrash: GET /ndrive/node/trash ---
export const ListTrashQuery = listQuery(NodeFilter);
export type ListTrashQuery = z.infer<typeof ListTrashQuery>;

export const ListTrashResponse = listResponse(Node);
export type ListTrashResponse = z.infer<typeof ListTrashResponse>;
