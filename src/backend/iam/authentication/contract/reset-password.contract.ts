import { z } from 'zod';

// --- resetPassword: POST /iam/authentication/reset-password/:token (200, no response body) ---
// Named after the backend's ResetPasswordWithTokenDto to avoid colliding with identity's
// own (differently-shaped) ResetPasswordBody — see iam/identity's password-reset contract.
export const ResetPasswordWithTokenParams = z.object({ token: z.string() });
export type ResetPasswordWithTokenParams = z.infer<typeof ResetPasswordWithTokenParams>;

export const ResetPasswordWithTokenBody = z
  .object({
    newPassword: z.string().min(8).max(128),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: 'passwordConfirmation must match newPassword',
    path: ['passwordConfirmation'],
  });
export type ResetPasswordWithTokenBody = z.infer<typeof ResetPasswordWithTokenBody>;
