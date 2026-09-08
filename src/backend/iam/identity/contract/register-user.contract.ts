import { z } from 'zod';
import { EmailAddressInput, PhoneInput } from '../../../common/contact';
import { AuthenticatedSession } from '../../authentication/domain/session';
import { Username } from '../domain/user';

// --- registerUserByInvitation: POST /iam/identity/register-user-by-invitation/:token ---
export const RegisterUserByInvitationParams = z.object({ token: z.string() });
export type RegisterUserByInvitationParams = z.infer<typeof RegisterUserByInvitationParams>;

export const RegisterUserByInvitationBody = z
  .object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    username: Username,
    email: EmailAddressInput,
    phone: PhoneInput,
    password: z.string().min(8).max(128),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'passwordConfirmation must match password',
    path: ['passwordConfirmation'],
  });
export type RegisterUserByInvitationBody = z.infer<typeof RegisterUserByInvitationBody>;

export const RegisterUserByInvitationResponse = AuthenticatedSession;
export type RegisterUserByInvitationResponse = z.infer<typeof RegisterUserByInvitationResponse>;
