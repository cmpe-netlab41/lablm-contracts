import { z } from 'zod';

import { MachineCapability } from '../enum/machine-capability';

// --- createMachine: POST /machine/registry ---
export const CreateMachineInput = z.object({
     name: z.string().min(1).max(100),
     description: z.string().max(255).optional(),
     ipAddress: z.string(),
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
export type CreateMachineInput = z.infer<typeof CreateMachineInput>;

// The controller returns the created machine's id as a bare string.
export const CreateMachineResponse = z.string();
export type CreateMachineResponse = z.infer<typeof CreateMachineResponse>;
