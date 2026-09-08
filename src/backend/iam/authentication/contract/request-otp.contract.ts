import { z } from 'zod';
import { EXACTLY_ONE_IDENTIFIER_MESSAGE, exactlyOneIdentifier, IdentifierFields } from '../domain/identifier';

// --- requestLoginCode: POST /iam/authentication/request-login-otp ---
export const RequestOtpBody = IdentifierFields.refine(exactlyOneIdentifier, {
     message: EXACTLY_ONE_IDENTIFIER_MESSAGE,
});
export type RequestOtpBody = z.infer<typeof RequestOtpBody>;

export const RequestOtpResponse = z.object({ otpToken: z.string() });
export type RequestOtpResponse = z.infer<typeof RequestOtpResponse>;
