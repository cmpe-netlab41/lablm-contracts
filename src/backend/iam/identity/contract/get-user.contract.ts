import { z } from 'zod';
import { User, UserId } from '../domain/user';

// --- getUserById: GET /iam/identity/:id ---
export const GetUserParams = z.object({ id: UserId });
export type GetUserParams = z.infer<typeof GetUserParams>;

export const GetUserResponse = User;
export type GetUserResponse = z.infer<typeof GetUserResponse>;
