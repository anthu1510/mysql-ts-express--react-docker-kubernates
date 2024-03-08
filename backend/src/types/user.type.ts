import z from 'zod';
import { UserSchema, UserCreateInputSchema, loginSchema, UserLoginInputSchema, authRequestSchema, UserGetbyIdSchema, UserUpdateInputSchema} from "../schemas/user.schema";


export type IUser = z.infer<typeof UserSchema> | {};
export type IUsers = IUser[] | [];
export type IUserCreateInput = z.infer<typeof UserCreateInputSchema>;
export type IUserUpdateInput = z.infer<typeof UserUpdateInputSchema>;
export type ILoginResponse = z.infer<typeof loginSchema>;
export type ILoginRequestBody = z.infer<typeof UserLoginInputSchema>;
export type IAuthRequest = z.infer<typeof authRequestSchema>;
export type IUserGetbyIdSchema = z.infer<typeof UserGetbyIdSchema>;