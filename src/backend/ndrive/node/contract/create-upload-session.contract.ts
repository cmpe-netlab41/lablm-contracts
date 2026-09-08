import { z } from 'zod';
import { NodeAccessType, NodeId } from '../domain/node';

// --- createUploadSession: POST /ndrive/node/upload-session ---
export const CreateUploadSessionBody = z.object({
  name: z.string().min(1),
  extension: z.string().min(1),
  size: z.number().int().positive(),
  accessType: NodeAccessType.optional(),
  parentId: NodeId.optional(),
});
export type CreateUploadSessionBody = z.infer<typeof CreateUploadSessionBody>;

export const CreateUploadSessionResponse = z.object({
  fmsToken: z.string(),
  nodeId: NodeId,
});
export type CreateUploadSessionResponse = z.infer<typeof CreateUploadSessionResponse>;
