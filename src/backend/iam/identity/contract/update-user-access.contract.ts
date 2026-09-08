import { z } from 'zod';
import { Permission, RoleId } from '../../authorization/domain/role';
import { UserId } from '../domain/user';

// --- updateUserAccess: PUT /iam/identity/:id/access ---
export const UpdateUserAccessParams = z.object({ id: UserId });
export type UpdateUserAccessParams = z.infer<typeof UpdateUserAccessParams>;

export const UpdateUserAccessBody = z.object({
  roles: z.array(RoleId),
  permittedActions: z.array(Permission),
  deniedActions: z.array(Permission),
});
export type UpdateUserAccessBody = z.infer<typeof UpdateUserAccessBody>;

export const UpdateUserAccessResponse = z.object({
  affectedCount: z.number(),
  affectedIds: z.array(z.string()),
});
export type UpdateUserAccessResponse = z.infer<typeof UpdateUserAccessResponse>;
