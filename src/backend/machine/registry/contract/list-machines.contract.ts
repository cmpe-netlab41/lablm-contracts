import { z } from 'zod';

import { listQuery, listResponse } from '../../../common/list';
import { Machine } from '../domain/machine';

// --- listMachines: GET /machine/registry ---
// No filter fields modeled — the UI only ever sends globalSearch/sort, not per-field operators.
export const MachineFilter = z.object({});
export type MachineFilter = z.infer<typeof MachineFilter>;

export const ListMachinesQuery = listQuery(MachineFilter);
export type ListMachinesQuery = z.infer<typeof ListMachinesQuery>;

export const ListMachinesResponse = listResponse(Machine);
export type ListMachinesResponse = z.infer<typeof ListMachinesResponse>;
