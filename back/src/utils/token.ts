import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { ENV } from '#src/config/env.js';

export const signAccessToken = (userId: string, sessionId: string) => {
  return jwt.sign({ sub: userId, sid: sessionId }, ENV.JWT_ACCESS_SECRET, { expiresIn: `${ENV.ACCESS_EXPIRES_IN}s` });
};

export const generateRefreshToken = (bytes = Number(ENV.REFRESH_TOKEN_BYTES) || 48) => {
  return crypto.randomBytes(bytes).toString('hex');
};

export const hashToken = async (token: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(token, salt);
};

export const compareHash = (token: string, hash: string) => bcrypt.compare(token, hash);
