import { z } from 'zod';

export const SortField = z.object({
  dataField: z.string(),
  direction: z.enum(['ASC', 'DESC']),
});
export type SortField = z.infer<typeof SortField>;

// limit/offset are required — the backend has no defaults for either.
export const listQuery = <Filter extends z.ZodTypeAny>(filter: Filter) =>
  z.object({
    limit: z.coerce.number().int().positive(),
    offset: z.coerce.number().int().min(0),
    globalSearch: z.string().optional(),
    sort: z.array(SortField).optional(),
    filter: filter.optional(),
  });

export const listResponse = <Item extends z.ZodTypeAny>(item: Item) =>
  z.object({
    data: z.array(item),
    total: z.number(),
  });
