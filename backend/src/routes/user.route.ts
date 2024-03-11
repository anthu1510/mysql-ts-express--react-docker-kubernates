import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import userController from '../controllers/user.controller';
import * as UserSchema from '../schemas/user.schema';
import { authenticateJWT } from '../middlewares/jwt';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', authenticateJWT, validateRequest({ params: UserSchema.UserGetbyIdSchema }), userController.getById);
router.post('/', validateRequest({ body: UserSchema.UserCreateInputSchema }), userController.create);
router.post('/login', validateRequest({ body: UserSchema.UserLoginInputSchema }), userController.login);

export default router;
