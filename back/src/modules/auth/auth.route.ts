import { Router } from 'express';
import { authController } from './auth.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { sendOtpSchema, verifyOtpSchema } from './auth.schema.js';
import { refreshController } from './auth.refresh.controller.js';
import authMiddleware from '#src/middlewares/auth.js';

const router = Router();

router.post('/send-otp', validate(sendOtpSchema), authController.sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), authController.verifyOtp);
router.post('/refresh', refreshController.refresh);
router.get('/me', authMiddleware, authController.getMe);

export default router;
