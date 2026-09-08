import z from "zod";
import { MachineStatus } from "../../registry/enum/machine-status";
import { MachineCapability } from "../../registry/enum/machine-capability";


export const BaseModelSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional(),
});

export enum MachineErrorType {
  CPU_USAGE_HIGH = 'CPU_USAGE_HIGH',
  CPU_TEMPERATURE_HIGH = 'CPU_TEMPERATURE_HIGH',
  GPU_USAGE_HIGH = 'GPU_USAGE_HIGH',
  GPU_TEMPERATURE_HIGH = 'GPU_TEMPERATURE_HIGH',
  VRAM_USAGE_HIGH = 'VRAM_USAGE_HIGH',
  POWER_CONSUMPTION_HIGH = 'POWER_CONSUMPTION_HIGH',
  MEMORY_USAGE_HIGH = 'MEMORY_USAGE_HIGH',
  DISK_USAGE_HIGH = 'DISK_USAGE_HIGH',
  DISK_TEMPERATURE_HIGH = 'DISK_TEMPERATURE_HIGH',
  MACHINE_SERVICE_NO_CONNECTION = 'MACHINE_SERVICE_NO_CONNECTION',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

export const MachineErrorTypeEnumSchema = z.enum(MachineErrorType);


export const CpuRegistryModelSchema = z.object({
     name: z.string(),
     cores: z.number(),
     speedMHz: z.number(),
});

export const MemoryRegistryModelSchema = z.object({
     totalMemory: z.number(),
});

// Intentionally NOT the same object as registry's canonical `Machine` schema
// (registry/domain/machine.ts) — this one coerces createdAt/updatedAt/deletedAt to `Date`
// (via BaseModelSchema) for report consumers, while the registry schema keeps them as ISO
// date strings. Keep both field lists in sync by hand (capabilities/machineCode included)
// rather than importing one into the other, since merging them would change the date type
// one side of this boundary already depends on.
export const MachineModelSchema = BaseModelSchema.extend({
    name: z.string(),
    description: z.string().optional(),
    ipAddress: z.string(),
    status: MachineStatus,
    capabilities: z.array(MachineCapability),
    machineCode: z.string().optional(),
    cpu: CpuRegistryModelSchema.optional(),
    memory: MemoryRegistryModelSchema.optional(),
    
    checkInterval: z.number(),
    timeoutThreshold: z.number(),
    
    cpuTemperatureThreshold: z.number().optional(),
    cpuUsageThreshold: z.number().optional(),
    memoryUsageThreshold: z.number().optional(),
});

export const NetworkUsageModelSchema = z.object({
  in: z.number(),
  out: z.number(),
  total: z.number(),
});

export const CpuUsageModelSchema = z.object({
  usage: z.number(),
  temperature: z.number(),
  powerConsumption: z.number(),
});

export const GpuUsageModelSchema = z.object({
  usage: z.number(),
  vramUsage: z.number(),
  temperature: z.number(),
  powerConsumption: z.number(),
});

export const MemoryUsageModelSchema = z.object({
  usage: z.number(),
});

export const DiskUsageModelSchema = z.object({
  name: z.string(),
  usage: z.number(),
  temperature: z.number(),
});



export const MachineLogModelSchema = BaseModelSchema.extend({
  networkUsage: NetworkUsageModelSchema,
  cpu: CpuUsageModelSchema,
  gpus: z.array(GpuUsageModelSchema),
  memory: MemoryUsageModelSchema,
  disks: z.array(DiskUsageModelSchema),
  logDelay: z.number(),
  unexpectedErrors: z.array(z.string()).optional(),
});


export const MachineErrorModelSchema = z.object({
  type: MachineErrorTypeEnumSchema,
  message: z.string(),
});


export const MachineReportModelSchema = BaseModelSchema.extend({
  machine: MachineModelSchema,
  log: MachineLogModelSchema,
  errors: z.array(MachineErrorModelSchema),
});


export const ListQueryResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    total: z.number(),
});

export const MachineReportListResponseSchema = ListQueryResponseSchema(MachineReportModelSchema)

export type FindMachineReportsResponse = z.infer<typeof MachineReportListResponseSchema>;
