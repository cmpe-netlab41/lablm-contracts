import { z } from 'zod';

// --- sendInvitationEmail: POST /iam/identity/send-invitation-email ---
// Note: despite the field name, `expiresAt` holds a TTL in seconds (the invitation link's
// lifetime), not an epoch timestamp — that's how the backend's InvitationModel is built.
export const Invitation = z.object({
  email: z.email(),
  expiresAt: z.number(),
});
export type Invitation = z.infer<typeof Invitation>;

// --- listPendingInvitations: GET /iam/identity/invitations ---
export const PendingInvitation = z.object({
  email: z.email(),
  expiresInSeconds: z.number(),
});
export type PendingInvitation = z.infer<typeof PendingInvitation>;
