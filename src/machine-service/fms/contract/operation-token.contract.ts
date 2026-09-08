import { z } from 'zod';

// The capability token backend mints (ndrive's node.service.ts createUploadToken)
// and machine-service verifies (fms-operation.guard.ts). A valid EdDSA signature
// only proves the bytes are authentic — this schema is what proves the claim set
// is well-formed before either side trusts it as FmsOperationToken.
export const FmsOperationTokenSchema = z.object({
  id: z.string().min(1),
  size: z.number().int().nonnegative(),
  jti: z.string().min(1),
  exp: z.number().int().positive(),
});

export type FmsOperationToken = z.infer<typeof FmsOperationTokenSchema>;
