import { z } from 'zod';

export const MachineErrorType = z.enum([
     'CPU_USAGE_HIGH',
     'CPU_TEMPERATURE_HIGH',
     'GPU_USAGE_HIGH',
     'GPU_TEMPERATURE_HIGH',
     'VRAM_USAGE_HIGH',
     'POWER_CONSUMPTION_HIGH',
     'MEMORY_USAGE_HIGH',
     'DISK_USAGE_HIGH',
     'DISK_TEMPERATURE_HIGH',
     'MACHINE_SERVICE_NO_CONNECTION',
     'UNEXPECTED_ERROR',
]);
export type MachineErrorType = z.infer<typeof MachineErrorType>;
