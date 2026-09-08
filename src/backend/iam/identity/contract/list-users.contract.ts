import { z } from 'zod';
import { StringFilter } from '../../../common/filter';
import { listQuery, listResponse } from '../../../common/list';
import { User } from '../domain/user';

// --- listUsers: GET /iam/identity ---
export const UserFilter = z.object({
  username: StringFilter.optional(),
  firstName: StringFilter.optional(),
  lastName: StringFilter.optional(),
});
export type UserFilter = z.infer<typeof UserFilter>;

export const ListUsersQuery = listQuery(UserFilter);
export type ListUsersQuery = z.infer<typeof ListUsersQuery>;

export const ListUsersResponse = listResponse(User);
export type ListUsersResponse = z.infer<typeof ListUsersResponse>;
