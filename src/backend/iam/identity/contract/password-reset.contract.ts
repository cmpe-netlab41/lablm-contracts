import { z } from 'zod';
import { EXACTLY_ONE_IDENTIFIER_MESSAGE, IdentifierFields, exactlyOneIdentifier } from '../../authentication/domain/identifier';

// --- requestPasswordReset: POST /iam/identity/request-password-reset (204, no response body) ---
// Accepts username/email/phone — unlike authentication's forgot-password flow, which is
// email-only. See iam/authentication's ForgotPasswordBody for that flow.
export const RequestPasswordResetBody = IdentifierFields.refine(exactlyOneIdentifier, {
  message: EXACTLY_ONE_IDENTIFIER_MESSAGE,
});
export type RequestPasswordResetBody = z.infer<typeof RequestPasswordResetBody>;

// --- resetPassword: POST /iam/identity/reset-password/:token (204, no response body) ---
export const ResetPasswordParams = z.object({ token: z.string() });
export type ResetPasswordParams = z.infer<typeof ResetPasswordParams>;

export const ResetPasswordBody = IdentifierFields.extend({
  newPassword: z.string().min(8).max(128),
  newPasswordConfirmation: z.string(),
})
  .refine(exactlyOneIdentifier, { message: EXACTLY_ONE_IDENTIFIER_MESSAGE })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: 'newPasswordConfirmation must match newPassword',
    path: ['newPasswordConfirmation'],
  });
export type ResetPasswordBody = z.infer<typeof ResetPasswordBody>;
