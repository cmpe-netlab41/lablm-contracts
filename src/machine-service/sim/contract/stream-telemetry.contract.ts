import { z } from 'zod';

export const NetworkTelemetrySchema = z.object( {
    inMegabytesPerSecond:    z.number().optional(),
    outMegabytesPerSecond:   z.number().optional(),
    totalMegabytesPerSecond: z.number().optional()
});


export const CPUTelemetrySchema = z.object({
    loadAverage:        z.array(z.number()),
    usagePercent:       z.number().optional(),
    temperatureCelsius: z.number().optional(),
    powerWatts:         z.number().optional()
});

export const MemoryTelemetrySchema = z.object({
    totalMegabytes: z.number(),
    freeMegabytes:  z.number(),
    usedMegabytes:  z.number(),
    usedPercent:    z.number()
});


export const GPUTelemetrySchema = z.object({
    name:               z.string().optional(),
    usagePercent:       z.number().optional(),
    vramUsedMegabytes:  z.number().optional(),
    temperatureCelsius: z.number().optional(),
    powerWatts:         z.number().optional()
});


export const DiskTelemetrySchema = z.object({
    name:                         z.string(),
    usedGigabytes:                z.number().optional(),
    temperatureCelsius:           z.number().optional(),
    readSpeedMegabytesPerSecond:  z.number().optional(),
    writeSpeedMegabytesPerSecond: z.number().optional()
});

export const TelemetrySnapshotSchema = z.object({
    uptimeSeconds:    z.number(),
    network:          NetworkTelemetrySchema,
    cpu:              CPUTelemetrySchema,
    memory:           MemoryTelemetrySchema,
    gpus:             z.array(GPUTelemetrySchema),
    disks:            z.array(DiskTelemetrySchema),
    unexpectedErrors: z.array(z.string()).optional(),
    collectedAt:      z.coerce.date()
});


export const TelemetryStreamMetaSchema = z.object({
    intervalMs: z.number(),
});


export const TelemetryEventSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("meta"), data: TelemetryStreamMetaSchema }),
  z.object({ type: z.literal("telemetry"), data: TelemetrySnapshotSchema }),
]);

export type StreamTelemetryEvent = z.infer<typeof TelemetryEventSchema>;
