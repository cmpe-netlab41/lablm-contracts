import { z } from 'zod';
import { AceId, AcePermission } from '../domain/ace';

// --- updateAce: PUT /ndrive/ace/:aceId ---
// Errors: 404 ACE_NOT_FOUND, 400 ALREADY_HAVE_THIS_PERMISSION.
export const UpdateAceParams = z.object({ aceId: AceId });
export type UpdateAceParams = z.infer<typeof UpdateAceParams>;

export const UpdateAceInput = z.object({ permission: AcePermission });
export type UpdateAceInput = z.infer<typeof UpdateAceInput>;

export const UpdateAceResponse = z.object({
     affectedCount: z.number(),
     affectedIds: z.array(z.uuid()),
});
export type UpdateAceResponse = z.infer<typeof UpdateAceResponse>;
