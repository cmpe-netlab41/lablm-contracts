import { z } from 'zod';

// What a client sends — backend never accepts verification state from the wire.
export const EmailAddressInput = z.object({ address: z.email() });
export type EmailAddressInput = z.infer<typeof EmailAddressInput>;

// What a client receives — includes server-managed verification state.
export const EmailAddress = EmailAddressInput.extend({
  isVerified: z.boolean().optional(),
  verifiedAt: z.number().optional(),
});
export type EmailAddress = z.infer<typeof EmailAddress>;

export const PhoneInput = z.object({
  dialCode: z.string().regex(/^\+\d{1,4}$/),
  number: z.string().regex(/^\d{6,15}$/),
});
export type PhoneInput = z.infer<typeof PhoneInput>;

export const Phone = PhoneInput.extend({
  isVerified: z.boolean().optional(),
  verifiedAt: z.number().optional(),
});
export type Phone = z.infer<typeof Phone>;
