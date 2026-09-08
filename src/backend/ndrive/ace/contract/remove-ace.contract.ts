import { z } from 'zod';
import { AceId } from '../domain/ace';

// --- removeAce: DELETE /ndrive/ace/:aceId (204, no response body; revokes a share) ---
// Errors: 404 ACE_NOT_FOUND.
export const RemoveAceParams = z.object({ aceId: AceId });
export type RemoveAceParams = z.infer<typeof RemoveAceParams>;
