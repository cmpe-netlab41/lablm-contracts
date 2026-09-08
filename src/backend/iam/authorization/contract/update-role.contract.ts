import { z } from 'zod';
import { Permission, RoleId } from '../domain/role';

// --- updateRole: PUT /iam/authorization/:id ---
export const UpdateRoleParams = z.object({ id: RoleId });
export type UpdateRoleParams = z.infer<typeof UpdateRoleParams>;

export const UpdateRoleBody = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(255).optional(),
  permittedActions: z.array(Permission),
  deniedActions: z.array(Permission),
});
export type UpdateRoleBody = z.infer<typeof UpdateRoleBody>;

// The controller's Swagger annotation claims this returns the updated Role, but its actual
// TypeScript return type (and what ships) is the generic update-query result. Contract
// follows the real return type — worth reconciling on the backend side separately.
export const UpdateRoleResponse = z.object({
  affectedCount: z.number(),
  affectedIds: z.array(z.string()),
});
export type UpdateRoleResponse = z.infer<typeof UpdateRoleResponse>;
