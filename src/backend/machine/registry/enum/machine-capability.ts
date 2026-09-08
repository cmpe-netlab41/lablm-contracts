import { z } from 'zod';

export const MachineCapability = z.enum(['compute', 'storage']);
export type MachineCapability = z.infer<typeof MachineCapability>;
