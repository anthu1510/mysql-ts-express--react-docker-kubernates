import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import userController from '../controllers/user.controller';
import { UserCreateInputSchema, UserLoginInputSchema, UserGetbyIdSchema } from '../validations/user.validation';
import { authenticateJWT } from '../middlewares/jwt';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', authenticateJWT, validateRequest({ params: UserGetbyIdSchema}), userController.getById);
router.post('/', validateRequest({ body: UserCreateInputSchema }), userController.create);
router.post('/login', validateRequest({ body: UserLoginInputSchema }), userController.login);

export default router;
