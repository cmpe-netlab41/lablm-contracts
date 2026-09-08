import { z } from 'zod';

// --- requestPasswordReset: POST /iam/authentication/forgot-password (200, no response body) ---
// Email-only — unlike identity's own password-reset flow, this one does not accept
// username/phone identifiers. See iam/identity's RequestPasswordResetBody for that flow.
export const ForgotPasswordBody = z.object({ email: z.email() });
export type ForgotPasswordBody = z.infer<typeof ForgotPasswordBody>;
