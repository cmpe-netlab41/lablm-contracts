import { z } from 'zod';
import { RoleId } from '../domain/role';

// --- deleteRoleById: DELETE /iam/authorization/:id (204, no response body) ---
export const DeleteRoleParams = z.object({ id: RoleId });
export type DeleteRoleParams = z.infer<typeof DeleteRoleParams>;
