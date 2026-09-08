import { z } from 'zod';
import { NodeId } from '../../node/domain/node';

export const AceId = z.uuid().brand<'AceId'>();
export type AceId = z.infer<typeof AceId>;

export const AcePermission = z.enum(['R', 'W', 'RW']);
export type AcePermission = z.infer<typeof AcePermission>;

export const PrincipalType = z.enum(['USER', 'WORKSPACE']);
export type PrincipalType = z.infer<typeof PrincipalType>;

export const Ace = z.object({
     id: AceId,
     nodeId: NodeId,
     principalId: z.uuid(),
     principalType: PrincipalType,
     permission: AcePermission,
     createdAt: z.iso.datetime(),
     updatedAt: z.iso.datetime(),
     deletedAt: z.iso.datetime().nullable().optional(),
});
export type Ace = z.infer<typeof Ace>;
