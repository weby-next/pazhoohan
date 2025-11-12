import { Router } from 'express';
import { userController } from './user.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { userIdSchema } from './user.schema.js';
import authMiddleware from '#src/middlewares/auth.js';
import { authorizeRole } from '#src/middlewares/authorize-role.js';
import { addressIdSchema, createAddressSchema, updateAddressSchema } from './address/address.schema.js';

const router = Router();

router.post('/me/address', authMiddleware, validate(createAddressSchema), userController.createAddress);
router.patch('/me/address/:id/default', authMiddleware, validate(addressIdSchema), userController.changeAddressToDefault);
router.patch(
  '/me/address/:id/update',
  authMiddleware,
  validate(addressIdSchema),
  validate(updateAddressSchema),
  userController.updateAddress,
);
router.delete('/me/address/:id', authMiddleware, validate(addressIdSchema), userController.deleteAddress);

router.patch('/:id/ban', authMiddleware, authorizeRole('admin'), validate(userIdSchema), userController.banUser);
router.patch('/:id/unban', authMiddleware, authorizeRole('admin'), validate(userIdSchema), userController.unbanUser);

export default router;
