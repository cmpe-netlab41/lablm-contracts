import { z } from 'zod';
import { Ace, AcePermission, PrincipalType } from '../domain/ace';
import { NodeId } from '../../node/domain/node';

// --- shareNode: POST /ndrive/ace/node/:nodeId ---
// Errors: 404 NODE_NOT_FOUND, 403 FORBIDDEN (not owner), 400 CANNOT_SHARE_WITH_SELF,
// 400 NODE_IS_PUBLIC, 409 CONFLICT (already shared with that principal).
export const ShareNodeParams = z.object({ nodeId: NodeId });
export type ShareNodeParams = z.infer<typeof ShareNodeParams>;

export const ShareNodeInput = z.object({
     principalId: z.uuid(),
     principalType: PrincipalType,
     permission: AcePermission,
});
export type ShareNodeInput = z.infer<typeof ShareNodeInput>;

export const ShareNodeResponse = Ace;
export type ShareNodeResponse = z.infer<typeof ShareNodeResponse>;
