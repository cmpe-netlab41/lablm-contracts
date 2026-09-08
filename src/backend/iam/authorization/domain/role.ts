import { z } from 'zod';

export const RoleId = z.uuid().brand<'RoleId'>();
export type RoleId = z.infer<typeof RoleId>;

// Mirrors the backend's Permission union (auth/identity/machine/ndrive tokens, see
// apps/backend .../authorization/types/permission.ts). Left as a plain string here instead
// of duplicating every literal — tighten to a generated union if drift becomes a problem.
export const Permission = z.string();
export type Permission = z.infer<typeof Permission>;

export const Role = z.object({
  id: RoleId,
  name: z.string(),
  description: z.string().optional(),
  permittedActions: z.array(Permission),
  deniedActions: z.array(Permission),
  index: z.number().int().nullable(),
  workspaceId: z.uuid().nullable().optional(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable().optional(),
});
export type Role = z.infer<typeof Role>;

export const PermissionGroup = z.object({
  prefix: z.string(),
  permissions: z.array(Permission),
});
export type PermissionGroup = z.infer<typeof PermissionGroup>;
