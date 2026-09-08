import { z } from 'zod';

export const MachineStatus = z.enum(['online', 'offline', 'degraded']);
export type MachineStatus = z.infer<typeof MachineStatus>;
