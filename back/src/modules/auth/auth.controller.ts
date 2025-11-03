import { Request, Response } from 'express';
import { authService } from './auth.service.js';
import { SendOtpInput, VerifyOtpInput } from './auth.schema.js';

export const authController = {
  sendOtp: async (req: Request<Record<string, unknown>, Record<string, unknown>, SendOtpInput['body']>, res: Response) => {
    const { phone } = req.body;
    const result = await authService.sendOtp(phone);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  },

  verifyOtp: async (req: Request<Record<string, unknown>, Record<string, unknown>, VerifyOtpInput['body']>, res: Response) => {
    const { phone, code } = req.body;
    const result = await authService.verifyOtp(phone, code);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  },
};
