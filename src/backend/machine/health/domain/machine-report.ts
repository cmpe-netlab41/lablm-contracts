import { z } from 'zod';

import { Machine } from '../../registry/domain/machine';
import { MachineErrorType } from '../enum/machine-error-type';
import { MachineLog } from './machine-log';

export const MachineError = z.object({
     type: MachineErrorType,
     message: z.string(),
});
export type MachineError = z.infer<typeof MachineError>;

export const MachineReport = z.object({
     id: z.uuid(),
     machine: Machine,
     log: MachineLog,
     errors: z.array(MachineError),
     createdAt: z.iso.datetime(),
     updatedAt: z.iso.datetime(),
});
export type MachineReport = z.infer<typeof MachineReport>;
