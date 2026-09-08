import { z } from 'zod';
import { Role, RoleId } from '../domain/role';

// --- findRoleById: GET /iam/authorization/:id ---
export const GetRoleParams = z.object({ id: RoleId });
export type GetRoleParams = z.infer<typeof GetRoleParams>;

export const GetRoleResponse = Role;
export type GetRoleResponse = z.infer<typeof GetRoleResponse>;
