import { Router } from 'express';
import { authController } from './auth.controller.js';
import { validate } from '#src/middlewares/validate.js';
import { sendOtpSchema, verifyOtpSchema } from './auth.schema.js';

const router = Router();

router.post('/send-otp', validate(sendOtpSchema), authController.sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), authController.verifyOtp);

export default router;
