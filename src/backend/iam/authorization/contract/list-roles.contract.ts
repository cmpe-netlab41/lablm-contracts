import { z } from 'zod';
import { StringFilter } from '../../../common/filter';
import { listQuery, listResponse } from '../../../common/list';
import { Role } from '../domain/role';

// --- findRoles: GET /iam/authorization ---
export const RoleFilter = z.object({
  name: StringFilter.optional(),
  description: StringFilter.optional(),
});
export type RoleFilter = z.infer<typeof RoleFilter>;

export const ListRolesQuery = listQuery(RoleFilter);
export type ListRolesQuery = z.infer<typeof ListRolesQuery>;

export const ListRolesResponse = listResponse(Role);
export type ListRolesResponse = z.infer<typeof ListRolesResponse>;
