import { z } from 'zod';
import { Invitation } from '../domain/invitation';

// --- sendInvitationEmail: POST /iam/identity/send-invitation-email ---
export const SendInvitationEmailBody = z.object({ email: z.email().max(255) });
export type SendInvitationEmailBody = z.infer<typeof SendInvitationEmailBody>;

export const SendInvitationEmailResponse = Invitation;
export type SendInvitationEmailResponse = z.infer<typeof SendInvitationEmailResponse>;
