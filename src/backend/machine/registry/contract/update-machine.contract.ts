import { z } from 'zod';

import { MachineCapability } from '../enum/machine-capability';

// --- updateMachine: PUT /machine/registry/:id ---
export const UpdateMachineInput = z.object({
     name: z.string().min(1).max(100),
     description: z.string().max(255),
     capabilities: z.array(MachineCapability).min(1),
     checkInterval: z.number().min(1),
     timeoutThreshold: z.number().min(1),
     cpuTemperatureThreshold: z.number().min(0),
     cpuUsageThreshold: z.number().min(0),
     memoryUsageThreshold: z.number().min(0),
     gpuTemperatureThreshold: z.number().min(0).optional(),
     totalVramUsageThreshold: z.number().min(0).optional(),
     totalPowerConsumptionThreshold: z.number().min(0).optional(),
     diskUsageThreshold: z.number().min(0).optional(),
     diskTemperatureThreshold: z.number().min(0).optional(),
});
export type UpdateMachineInput = z.infer<typeof UpdateMachineInput>;

export const UpdateMachineResponse = z.object({
     affectedCount: z.number(),
     affectedIds: z.array(z.string()),
});
export type UpdateMachineResponse = z.infer<typeof UpdateMachineResponse>;
