import { z } from 'zod';

export const NodeId = z.uuid().brand<'NodeId'>();
export type NodeId = z.infer<typeof NodeId>;

export const NodeKind = z.enum(['FILE', 'FOLDER']);
export type NodeKind = z.infer<typeof NodeKind>;

export const NodeAccessType = z.enum(['PRIVATE', 'PUBLIC']);
export type NodeAccessType = z.infer<typeof NodeAccessType>;

export const NodeStatus = z.enum(['PENDING', 'CREATED', 'ERROR']);
export type NodeStatus = z.infer<typeof NodeStatus>;

export const Node = z.object({
  id: NodeId,
  parentId: NodeId.nullable(),
  name: z.string(),
  extension: z.string().nullable(),
  size: z.number().nullable(),
  ownerId: z.uuid(),
  kind: NodeKind,
  accessType: NodeAccessType,
  status: NodeStatus,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable(),
});
export type Node = z.infer<typeof Node>;
