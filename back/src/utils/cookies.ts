import { ENV } from '#src/config/env.js';

export const setAuthCookies = (res: any, refreshToken: any) => {
  // const secure = ENV.COOKIE_SECURE === 'true';
  // const domain = ENV.COOKIE_DOMAIN;

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: Number(ENV.REFRESH_EXPIRES_IN) * 1000,
    // domain,
    path: '/',
  });
};
