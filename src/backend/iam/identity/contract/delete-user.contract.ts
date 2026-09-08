import { z } from 'zod';
import { UserId } from '../domain/user';

// --- deleteUserById: DELETE /iam/identity/:id (204, no response body; soft delete) ---
export const DeleteUserParams = z.object({ id: UserId });
export type DeleteUserParams = z.infer<typeof DeleteUserParams>;
