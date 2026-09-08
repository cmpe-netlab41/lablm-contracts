import { z } from 'zod';
import { PendingInvitation } from '../domain/invitation';

// --- listPendingInvitations: GET /iam/identity/invitations ---
export const ListPendingInvitationsResponse = z.array(PendingInvitation);
export type ListPendingInvitationsResponse = z.infer<typeof ListPendingInvitationsResponse>;
