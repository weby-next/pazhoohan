import express from 'express';
import { adminController } from './admin.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { userIdSchema } from '../user.schema.js';
import { authorizeRole } from '#src/middlewares/authorize-role.js';
import authMiddleware from '#src/middlewares/auth.js';

const router = express.Router();

router.patch('/users/:id/ban', authMiddleware, authorizeRole('admin'), validate(userIdSchema), adminController.banUser);
router.patch('/users/:id/unban', authMiddleware, authorizeRole('admin'), validate(userIdSchema), adminController.unbanUser);

export default router;
