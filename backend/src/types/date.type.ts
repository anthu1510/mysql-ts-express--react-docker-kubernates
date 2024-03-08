import z from 'zod';
import {dateSchema} from "../schemas/date.schema";

export type IDate = z.infer<typeof dateSchema>;