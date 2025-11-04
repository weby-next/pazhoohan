import { Request, Response } from 'express';
import { authService } from './auth.service.js';
import { SendOtpInput, VerifyOtpInput } from './auth.schema.js';
import sessionService from '#src/services/session.service.js';
import { signAccessToken } from '#src/utils/token.js';
import { setAuthCookies } from '#src/utils/cookies.js';

const normalizeHeader = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export const authController = {
  sendOtp: async (req: Request<Record<string, unknown>, Record<string, unknown>, SendOtpInput['body']>, res: Response) => {
    const { phone } = req.body;
    const result = await authService.sendOtp(phone);
    res.success(result, 'success');
  },

  verifyOtp: async (req: Request<Record<string, unknown>, Record<string, unknown>, VerifyOtpInput['body']>, res: Response) => {
    const { phone, code } = req.body;
    const result = await authService.verifyOtp(phone, code);

    const user = result.user as any;
    const userId = user && user._id ? String(user._id) : undefined;
    if (!userId) throw new Error('User id not found');

    const ipRaw =
      (req.headers['cf-connecting-ip'] as string | string[] | undefined) ??
      (req.headers['x-forwarded-for'] as string | string[] | undefined) ??
      req.ip;
    const ip = normalizeHeader(ipRaw);

    const session = await sessionService.createSession(userId, {
      ip: ip || undefined,
      ua: req.get('user-agent') || undefined,
      device: req.get('x-device-name') || undefined,
    });

    const accessToken = signAccessToken(userId, session.sessionId);

    const refreshToken = `${session.sessionId}.${session.refreshRaw}`;

    setAuthCookies(res, refreshToken);

    res.success(
      {
        message: result.message,
        user,
        accessToken,
        session: {
          expiresIn: session.expiresIn,
        },
      },
      'success',
    );
  },
};
