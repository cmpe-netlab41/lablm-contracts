import { z } from 'zod';
import { UserId } from '../domain/user';
import { UpdateProfileBody, UpdateProfileResponse } from './update-profile.contract';

// --- updateUser: PUT /iam/identity/:id ---
// Administrative update — the backend's UpdateUserDto is a bodyless subclass of
// UpdateProfileDto, so the request/response shapes are identical.
export const UpdateUserParams = z.object({ id: UserId });
export type UpdateUserParams = z.infer<typeof UpdateUserParams>;

export const UpdateUserBody = UpdateProfileBody;
export type UpdateUserBody = z.infer<typeof UpdateUserBody>;

export const UpdateUserResponse = UpdateProfileResponse;
export type UpdateUserResponse = z.infer<typeof UpdateUserResponse>;
