import { z } from 'zod';
import { Permission, RoleId } from '../domain/role';

// --- createRole: POST /iam/authorization ---
export const CreateRoleBody = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(255).optional(),
  permittedActions: z.array(Permission).optional(),
  deniedActions: z.array(Permission).optional(),
});
export type CreateRoleBody = z.infer<typeof CreateRoleBody>;

// Backend returns just the new role's id, not the full Role.
export const CreateRoleResponse = RoleId;
export type CreateRoleResponse = z.infer<typeof CreateRoleResponse>;
