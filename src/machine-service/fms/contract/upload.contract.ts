import { z } from 'zod';

export const WriteResultSchema = z.object({
  size: z.number().int().nonnegative(), 
  checksum: z.string().length(64).regex(/^[a-fA-F0-9]+$/, "Checksum must be a hex-encoded string"),
});

export type UploadResponse = z.infer<typeof WriteResultSchema>;