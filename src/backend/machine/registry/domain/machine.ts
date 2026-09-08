import { z } from 'zod';

import { MachineCapability } from '../enum/machine-capability';
import { MachineStatus } from '../enum/machine-status';

export const CpuRegistry = z.object({
     name: z.string(),
     cores: z.number(),
     speedMHz: z.number(),
});
export type CpuRegistry = z.infer<typeof CpuRegistry>;

export const MemoryRegistry = z.object({
     totalMemory: z.number(),
});
export type MemoryRegistry = z.infer<typeof MemoryRegistry>;

export const GpuRegistry = z.object({
     name: z.string(),
     description: z.string().optional(),
     memory: z.number(),
});
export type GpuRegistry = z.infer<typeof GpuRegistry>;

export const DiskRegistry = z.object({
     name: z.string(),
     description: z.string().optional(),
     diskSize: z.number(),
     readSpeedMegabytesPerSecond: z.number().optional(),
     writeSpeedMegabytesPerSecond: z.number().optional(),
});
export type DiskRegistry = z.infer<typeof DiskRegistry>;

// The backend models this as an abstract MachineModel with ComputeMachineModel/
// StorageMachineModel subclasses, but capabilities is an array — a machine can be both, or
// neither yet (freshly registered) — so the response is flattened into one shape with every
// compute/storage field optional, discriminated at the UI layer by `capabilities`, not by type.
export const Machine = z.object({
     id: z.uuid(),
     name: z.string(),
     description: z.string().nullable().optional(),
     ipAddress: z.string(),
     status: MachineStatus,
     capabilities: z.array(MachineCapability),
     machineCode: z.string().nullable().optional(),
     cpu: CpuRegistry.nullable().optional(),
     memory: MemoryRegistry.nullable().optional(),

     checkInterval: z.number(),
     timeoutThreshold: z.number(),
     cpuTemperatureThreshold: z.number().nullable().optional(),
     cpuUsageThreshold: z.number().nullable().optional(),
     memoryUsageThreshold: z.number().nullable().optional(),

     // compute-only
     gpus: z.array(GpuRegistry).nullable().optional(),
     totalVram: z.number().nullable().optional(),
     gpuTemperatureThreshold: z.number().nullable().optional(),
     totalVramUsageThreshold: z.number().nullable().optional(),
     totalPowerConsumptionThreshold: z.number().nullable().optional(),

     // storage-only
     totalDiskSize: z.number().nullable().optional(),
     disks: z.array(DiskRegistry).nullable().optional(),
     diskUsageThreshold: z.number().nullable().optional(),
     diskTemperatureThreshold: z.number().nullable().optional(),

     createdAt: z.iso.datetime(),
     updatedAt: z.iso.datetime(),
     deletedAt: z.iso.datetime().nullable().optional(),
});
export type Machine = z.infer<typeof Machine>;
