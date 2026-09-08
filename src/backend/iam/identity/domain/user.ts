import { z } from 'zod';
import { EmailAddress, Phone } from '../../../common/contact';
import { Permission, Role } from '../../authorization/domain/role';

export const UserId = z.uuid().brand<'UserId'>();
export type UserId = z.infer<typeof UserId>;

export const Username = z
  .string()
  .min(3)
  .max(50)
  .regex(/^[a-z0-9._-]+$/);
export type Username = z.infer<typeof Username>;

export const User = z.object({
  id: UserId,
  username: Username,
  firstName: z.string(),
  lastName: z.string(),
  email: EmailAddress,
  phone: Phone,
  roles: z.array(Role),
  permittedActions: z.array(Permission),
  deniedActions: z.array(Permission),
  effectiveIndex: z.number().int(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  deletedAt: z.iso.datetime().nullable().optional(),
});
export type User = z.infer<typeof User>;
