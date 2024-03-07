import z from 'zod';

const statusSchema = z.enum(['active', 'inactive']);

const userSchema = z
  .object({
    id: z.number().min(1),
    roleId: z.number().min(1),
    name: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string().min(1),
    status: statusSchema.default('active').optional().nullable(),
    createdAt: z.coerce.date().optional().nullable(),
    updatedAt: z.coerce.date().optional().nullable()
  })
  .strict();

const loginSchema = z
  .object({
    status: z.boolean(),
    accessToken: z.string(),
    refreshToken: z.string()
  })
  .strict();

const authRequestSchema = z.object({
  userId: z.number().min(1),
  name: z.string().min(1),
  roleId: z.number().min(1),
}).strict();

export const UserSchema = userSchema.omit({ password: true });
export const UserCreateInputSchema = userSchema.omit({ id: true });
export const UserGetbyIdSchema = z.object({id: z.string().min(1)});
export const UserLoginInputSchema = UserCreateInputSchema.pick({ email: true, password: true });
export const UserUpdateInputSchema = UserCreateInputSchema.partial();

export type IUser = z.infer<typeof UserSchema> | {};
export type IUsers = IUser[] | [];
export type IUserCreateInput = z.infer<typeof UserCreateInputSchema>;
export type ILoginResponse = z.infer<typeof loginSchema>;
export type ILoginRequestBody = z.infer<typeof UserLoginInputSchema>;
export type IAuthRequest = z.infer<typeof authRequestSchema>;
export type IUserGetbyIdSchema = z.infer<typeof UserGetbyIdSchema>;
