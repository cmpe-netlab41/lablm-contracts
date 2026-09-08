import { z } from 'zod';
import { EmailAddressInput, PhoneInput } from '../../../common/contact';

// Shared by every iam endpoint that accepts "username OR email OR phone" as a login/lookup
// identifier (login, OTP request, password reset) — mirrors the backend's reused
// @ExactlyOneIdentifier() decorator so the constraint isn't redefined per endpoint.
export const IdentifierFields = z.object({
     username: z.string().min(3).max(50).optional(),
     email: EmailAddressInput.optional(),
     phone: PhoneInput.optional(),
});
export type IdentifierFields = z.infer<typeof IdentifierFields>;

export const exactlyOneIdentifier = (data: IdentifierFields): boolean =>
     [data.username, data.email, data.phone].filter(value => value !== undefined).length === 1;

export const EXACTLY_ONE_IDENTIFIER_MESSAGE = 'Exactly one of username, email, or phone must be provided.';
