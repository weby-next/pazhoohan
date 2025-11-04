import { Request, Response } from 'express';
import sessionService from '#src/services/session.service.js';
// import { signAccessToken } from '#src/utils/token.js';
import { setAuthCookies } from '#src/utils/cookies.js';
import { AppError } from '#src/middlewares/error-handler.js';

export const refreshController = {
  refresh: async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) throw new AppError('Missing refresh token', 401);

    const parsed = sessionService.parseCompoundToken(refreshToken);
    if (!parsed) throw new AppError('Invalid refresh token format', 401);

    const rotated = await sessionService.validateAndRotate(parsed);

    // const newAccessToken = signAccessToken(rotated.userId, rotated.sessionId);

    const newRefreshToken = `${rotated.sessionId}.${rotated.newRefreshRaw}`;

    setAuthCookies(res, newRefreshToken);

    res.success(
      {
        message: 'Tokens refreshed successfully',
        expiresIn: rotated.expiresIn,
      },
      'success',
    );
  },
};
