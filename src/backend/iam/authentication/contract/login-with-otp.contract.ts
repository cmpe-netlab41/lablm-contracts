import { z } from 'zod';
import { AuthenticatedSession } from '../domain/session';

// --- loginWithCode: POST /iam/authentication/login-with-otp ---
export const LoginWithOtpBody = z.object({
  otpToken: z.string(),
  otpCode: z.string(),
});
export type LoginWithOtpBody = z.infer<typeof LoginWithOtpBody>;

export const LoginWithOtpResponse = AuthenticatedSession;
export type LoginWithOtpResponse = z.infer<typeof LoginWithOtpResponse>;
