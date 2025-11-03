import { Router } from 'express';
import { userController } from './user.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { createUserSchema, getUserByIdSchema, deleteUserSchema } from './user.schema.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', validate(getUserByIdSchema), userController.getUserById);
router.post('/', validate(createUserSchema), userController.createUser);
router.delete('/:id', validate(deleteUserSchema), userController.deleteUser);

export default router;
