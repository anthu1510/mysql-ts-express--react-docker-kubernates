import z from 'zod';
import { statusSchema } from "./status.schema"
import { dateSchema } from "./date.schema"

export const roleZodSchema = z.object({
    id: z.number().min(1),
    roleName: z.number().min(1)
}).strict();

export const roleSchema = z.union([roleZodSchema, statusSchema, dateSchema])

export const RoleCreateInputSchema = roleZodSchema.omit({ id: true });
export const RoleGetbyIdSchema = roleZodSchema.pick({id: true});
export const RoleUpdateInputSchema = RoleCreateInputSchema.partial();