import { Router } from 'express';
import { userController } from './user.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { userIdSchema } from './user.schema.js';
import authMiddleware from '#src/middlewares/auth.js';
import { authorizeRole } from '#src/middlewares/authorize-role.js';
import { createAddressSchema } from './address/address.schema.js';

const router = Router();

router.post('/me/address', authMiddleware, validate(createAddressSchema), userController.createAddress);

router.patch('/:id/ban', authMiddleware, authorizeRole('admin'), validate(userIdSchema), userController.banUser);
router.patch('/:id/unban', authMiddleware, authorizeRole('admin'), validate(userIdSchema), userController.unbanUser);

export default router;
