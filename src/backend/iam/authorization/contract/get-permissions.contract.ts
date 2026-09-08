import { z } from 'zod';
import { PermissionGroup } from '../domain/role';

// --- getPermissions: GET /iam/authorization/permissions ---
export const GetPermissionsResponse = z.array(PermissionGroup);
export type GetPermissionsResponse = z.infer<typeof GetPermissionsResponse>;
