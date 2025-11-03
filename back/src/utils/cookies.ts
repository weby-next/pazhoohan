import { ENV } from '#src/config/env.js';

export const setAuthCookies = (res: any, accessToken: any, refreshToken: any) => {
  const secure = ENV.COOKIE_SECURE === 'true';
  const domain = ENV.COOKIE_DOMAIN;

  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure,
    sameSite: 'strict',
    maxAge: Number(ENV.ACCESS_EXPIRES_IN) * 1000,
    domain,
    path: '/',
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure,
    sameSite: 'strict',
    maxAge: Number(ENV.REFRESH_EXPIRES_IN) * 1000,
    domain,
    path: '/auth/refresh',
  });
};
