import { Router } from 'express';
import { userController } from './user.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { userIdSchema } from './user.schema.js';
import authMiddleware from '#src/middlewares/auth.js';
import { authorizeRole } from '#src/middlewares/authorize-role.js';

const router = Router();

router.patch('/:id/ban', authMiddleware, authorizeRole('admin'), validate(userIdSchema), userController.banUser);
router.patch('/:id/unban', authMiddleware, authorizeRole('admin'), validate(userIdSchema), userController.unbanUser);

export default router;
