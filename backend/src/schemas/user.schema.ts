import z from 'zod';
import { statusSchema } from './status.schema';
import { dateSchema } from './date.schema';

export const userZodSchema = z
  .object({
    id: z.number().min(1),
    roleId: z.number().min(1),
    name: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string().min(1)
  })
  .strict();

export const userSchema = z.union([userZodSchema, statusSchema, dateSchema]);

export const loginSchema = z
  .object({
    status: z.boolean(),
    accessToken: z.string(),
    refreshToken: z.string()
  })
  .strict();

export const authRequestSchema = z
  .object({
    userId: z.number().min(1),
    name: z.string().min(1),
    roleId: z.number().min(1)
  })
  .strict();

export const UserSchema = userZodSchema.omit({ password: true });
export const UserCreateInputSchema = userZodSchema.omit({ id: true });
export const UserGetbyIdSchema = z.object({ id: z.string().min(1) });
export const UserLoginInputSchema = UserCreateInputSchema.pick({ email: true, password: true });
export const UserUpdateInputSchema = UserCreateInputSchema.partial();
