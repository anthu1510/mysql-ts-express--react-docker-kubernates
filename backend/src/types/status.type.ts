import z from 'zod';
import { statusSchema } from '../schemas/status.schema';

export type IStatus = z.infer<typeof statusSchema>;
