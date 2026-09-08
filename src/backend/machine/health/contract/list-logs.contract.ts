import { z } from 'zod';

import { listQuery, listResponse } from '../../../common/list';
import { MachineLog } from '../domain/machine-log';

// --- listMachineLogs: GET /machine/health/:id/logs ---
export const MachineLogFilter = z.object({});
export type MachineLogFilter = z.infer<typeof MachineLogFilter>;

export const ListMachineLogsQuery = listQuery(MachineLogFilter);
export type ListMachineLogsQuery = z.infer<typeof ListMachineLogsQuery>;

export const ListMachineLogsResponse = listResponse(MachineLog);
export type ListMachineLogsResponse = z.infer<typeof ListMachineLogsResponse>;


