import { z } from 'zod';

export const StringFilter = z.object({
  kind: z.literal('string').default('string'),
  equalTo: z.string().optional(),
  notEqualTo: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  contains: z.string().optional(),
  notContains: z.string().optional(),
  doesExists: z.boolean().optional(),
});
export type StringFilter = z.infer<typeof StringFilter>;
