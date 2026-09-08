import { z } from 'zod';

import { UpdateMachineResponse } from './update-machine.contract';

// --- refreshMachineInventory: PATCH /machine/registry/:id/inventory ---
// The backend re-fetches inventory from the machine's stored IP and rejects (409
// MACHINE_CODE_MISMATCH) if its machineCode doesn't match this machine's stored one — same
// guard as updateMachineIpAddress, since a re-pulled inventory can also come from a different
// physical machine if the IP now answers somewhere else — see machine-registry.service.ts.
// Pass force:true to accept the new machineCode anyway, overwriting the stored one.
export const RefreshMachineInventoryInput = z.object({
     force: z.boolean().optional(),
});
export type RefreshMachineInventoryInput = z.infer<typeof RefreshMachineInventoryInput>;

export const RefreshMachineInventoryResponse = UpdateMachineResponse;
export type RefreshMachineInventoryResponse = z.infer<typeof RefreshMachineInventoryResponse>;
