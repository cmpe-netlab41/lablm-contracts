import { z } from 'zod';

export const NetworkUsage = z.object({
     in: z.number(),
     out: z.number(),
     total: z.number(),
});
export type NetworkUsage = z.infer<typeof NetworkUsage>;

export const CpuUsage = z.object({
     usage: z.number(),
     temperature: z.number(),
     powerConsumption: z.number(),
});
export type CpuUsage = z.infer<typeof CpuUsage>;

export const GpuUsage = z.object({
     usage: z.number(),
     vramUsage: z.number(),
     temperature: z.number(),
     powerConsumption: z.number(),
});
export type GpuUsage = z.infer<typeof GpuUsage>;

export const MemoryUsage = z.object({
     usage: z.number(),
});
export type MemoryUsage = z.infer<typeof MemoryUsage>;

export const DiskUsage = z.object({
     name: z.string(),
     usage: z.number(),
     temperature: z.number(),
});
export type DiskUsage = z.infer<typeof DiskUsage>;

export const MachineLog = z.object({
     id: z.uuid(),
     networkUsage: NetworkUsage,
     cpu: CpuUsage,
     gpus: z.array(GpuUsage),
     memory: MemoryUsage,
     disks: z.array(DiskUsage),
     logDelay: z.number(),
     unexpectedErrors: z.array(z.string()).nullable().optional(),
     createdAt: z.iso.datetime(),
     updatedAt: z.iso.datetime(),
});
export type MachineLog = z.infer<typeof MachineLog>;
