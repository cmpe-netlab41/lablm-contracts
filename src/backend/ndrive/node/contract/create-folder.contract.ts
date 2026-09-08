import { z } from 'zod';
import { Node, NodeId } from '../domain/node';

// --- createFolder: POST /ndrive/node/folder ---
export const CreateFolderBody = z.object({
  name: z.string().min(1).max(255),
  parentId: NodeId.optional(),
});
export type CreateFolderBody = z.infer<typeof CreateFolderBody>;

export const CreateFolderResponse = Node;
export type CreateFolderResponse = z.infer<typeof CreateFolderResponse>;
