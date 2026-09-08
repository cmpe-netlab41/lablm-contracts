import { z } from 'zod';

import { Machine } from '../domain/machine';

// --- getMachine: GET /machine/registry/:id ---
export const GetMachineResponse = Machine;
export type GetMachineResponse = z.infer<typeof GetMachineResponse>;
