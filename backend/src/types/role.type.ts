import z from 'zod';
import {roleSchema, RoleCreateInputSchema, RoleUpdateInputSchema, RoleGetbyIdSchema} from "../schemas/role.schema";


export type IRole = z.infer<typeof roleSchema> | {};
export type IRoles = IRole[] | [];
export type IRoleCreateInput = z.infer<typeof RoleCreateInputSchema>;
export type IRoleUpdateInput = z.infer<typeof RoleUpdateInputSchema>;
export type IRoleGetbyIdSchema = z.infer<typeof RoleGetbyIdSchema>;