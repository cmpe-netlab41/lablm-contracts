import { z } from 'zod';

import { listQuery, listResponse } from '../../../common/list';
import { MachineReport } from '../domain/machine-report';

// --- listMachineReports: GET /machine/health/:id/reports ---
export const MachineReportFilter = z.object({});
export type MachineReportFilter = z.infer<typeof MachineReportFilter>;

export const ListMachineReportsQuery = listQuery(MachineReportFilter);
export type ListMachineReportsQuery = z.infer<typeof ListMachineReportsQuery>;

export const ListMachineReportsResponse = listResponse(MachineReport);
export type ListMachineReportsResponse = z.infer<typeof ListMachineReportsResponse>;
