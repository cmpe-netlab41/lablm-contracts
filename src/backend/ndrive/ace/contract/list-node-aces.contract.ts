import { z } from 'zod';
import { listQuery, listResponse } from '../../../common/list';
import { Ace } from '../domain/ace';
import { NodeId } from '../../node/domain/node';

// --- getNodeAces: GET /ndrive/ace/node/:nodeId ---
export const ListNodeAcesParams = z.object({ nodeId: NodeId });
export type ListNodeAcesParams = z.infer<typeof ListNodeAcesParams>;

export const AceFilter = z.object({});
export type AceFilter = z.infer<typeof AceFilter>;

export const ListNodeAcesQuery = listQuery(AceFilter);
export type ListNodeAcesQuery = z.infer<typeof ListNodeAcesQuery>;

export const ListNodeAcesResponse = listResponse(Ace);
export type ListNodeAcesResponse = z.infer<typeof ListNodeAcesResponse>;
