import { z } from 'zod';
import { AuthenticatedSession } from '../domain/session';

// --- refreshToken: POST /iam/authentication/refresh-token ---
export const RefreshTokenBody = z.object({ refreshToken: z.string() });
export type RefreshTokenBody = z.infer<typeof RefreshTokenBody>;

export const RefreshTokenResponse = AuthenticatedSession;
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponse>;
