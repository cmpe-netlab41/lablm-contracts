import { z } from 'zod';


export const CPUInfoSchema = z.object({
    name:     z.string(),
    cores:    z.number(),
    speedMHz: z.number() 
});

export const MemoryInfoSchema = z.object({
  totalMemory: z.number()
});

export const GPUInfoSchema = z.object({
  name:        z.string(),
  description: z.string().optional(),
  memory:      z.number()
});

export const DiskInfoSchema = z.object({
  name:                         z.string(),
  description:                  z.string().optional(),
  diskSize:                     z.number(),
  readSpeedMegabytesPerSecond:  z.number().optional(),
  writeSpeedMegabytesPerSecond: z.number().optional()
});

export const SystemInfoSchema = z.object({
    hostname:           z.string(),
    platform:           z.string(),
    arch:               z.string(),
    release:            z.string(),
    // Stable, OS-provided machine identity (never generated/persisted by the
    // machine service — see apps/machine-service SIM domain invariants).
    // Optional: unreadable on unsupported platforms or if the OS-level file/
    // registry lookup fails.
    machineCode:        z.string().optional(),
    cpu:                CPUInfoSchema,
    memory:             MemoryInfoSchema,
    gpus:               z.array(GPUInfoSchema).optional(),
    totalVram:          z.number().optional(),
    disks:              z.array(DiskInfoSchema).optional(),
    totalDiskSize:      z.number().optional(),
    collectionWarnings: z.array(z.string()).optional(),
    collectedAt:        z.coerce.date()
});


export type GetSystemInfoResponse = z.infer<typeof SystemInfoSchema>;
