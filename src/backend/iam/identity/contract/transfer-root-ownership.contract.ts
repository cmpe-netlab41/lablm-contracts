import { z } from 'zod';
import { UserId } from '../domain/user';

// --- transferRootOwnership: POST /iam/identity/:id/transfer-root (200, no response body) ---
export const TransferRootOwnershipParams = z.object({ id: UserId });
export type TransferRootOwnershipParams = z.infer<typeof TransferRootOwnershipParams>;
