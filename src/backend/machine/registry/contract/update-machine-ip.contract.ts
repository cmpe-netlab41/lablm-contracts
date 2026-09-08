import { z } from 'zod';

import { UpdateMachineResponse } from './update-machine.contract';

// --- updateMachineIpAddress: PATCH /machine/registry/:id/ip-address ---
// The backend re-fetches inventory from the new IP and rejects (409 MACHINE_CODE_MISMATCH) if
// its machineCode doesn't match this machine's stored one — see machine-registry.service.ts.
// Pass force:true to accept the new machineCode anyway (e.g. the physical machine behind this
// IP was deliberately replaced) — the stored machineCode is then overwritten instead of rejected.
export const UpdateMachineIpInput = z.object({
     ipAddress: z.string(),
     force: z.boolean().optional(),
});
export type UpdateMachineIpInput = z.infer<typeof UpdateMachineIpInput>;

export const UpdateMachineIpResponse = UpdateMachineResponse;
export type UpdateMachineIpResponse = z.infer<typeof UpdateMachineIpResponse>;
