import { z } from 'zod';
import { EmailAddressInput, PhoneInput } from '../../../common/contact';

// --- updateProfile: PUT /iam/identity/profile ---
export const UpdateProfileBody = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: EmailAddressInput,
  phone: PhoneInput,
});
export type UpdateProfileBody = z.infer<typeof UpdateProfileBody>;

export const UpdateProfileResponse = z.object({
  affectedCount: z.number(),
  affectedIds: z.array(z.string()),
});
export type UpdateProfileResponse = z.infer<typeof UpdateProfileResponse>;
