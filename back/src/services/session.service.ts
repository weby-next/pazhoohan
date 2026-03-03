import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import redis from '#src/config/redis.js';
import { ENV } from '#src/config/env.js';
import { logger } from '#src/middlewares/logger.js';
import { AppError } from '#src/middlewares/error-handler.js';
import crypto from 'crypto';

type SessionMeta = {
  userId: string;
  ip?: string | string[];
  ua?: string;
  device?: string;
  createdAt?: number;
  updatedAt?: number;
  expiresAt?: number;
  refreshHash?: string;
};

const SESSION_PREFIX = 'sess:';
const USER_SESSIONS_PREFIX = 'user:sessions:';

const REFRESH_EXPIRES = Number(ENV.REFRESH_EXPIRES_IN || 604800);
const REFRESH_TOKEN_BYTES = Number(ENV.REFRESH_TOKEN_BYTES || 48);
const BCRYPT_SALT_ROUNDS = Number(ENV.SALT_ROUNDS || 10);

const sessKey = (id: string) => `${SESSION_PREFIX}${id}`;
const userSessionsKey = (userId: string) => `${USER_SESSIONS_PREFIX}${userId}`;

const genRefreshRaw = (bytes = REFRESH_TOKEN_BYTES) => Buffer.from(uuidv4().replace(/-/g, '') + cryptoRandomHex(bytes)).toString('hex');

function cryptoRandomHex(n: number) {
  return crypto.randomBytes(n).toString('hex');
}

const hashToken = async (token: string) => {
  const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
  return bcrypt.hash(token, salt);
};
const compareHash = (token: string, hash: string) => bcrypt.compare(token, hash);

export const sessionService = {
  /**
   * createSession:
   *  - creates sessionId
   *  - generates refresh raw token and stores only its bcrypt hash in Redis
   *  - stores session metadata under sess:{sessionId} with TTL = REFRESH_EXPIRES
   *  - adds sessionId to user:sessions:{userId} set
   * returns { sessionId, refreshRaw }
   */
  createSession: async (
    userId: string,
    meta: { ip?: string; ua?: string; device?: string } = {},
  ): Promise<{ sessionId: string; refreshRaw: string; expiresIn: number }> => {
    const sessionId = uuidv4();
    const refreshRaw = genRefreshRaw();
    const refreshHash = await hashToken(refreshRaw);

    const now = Date.now();
    const expiresAt = now + REFRESH_EXPIRES * 1000;

    const payload: SessionMeta = {
      userId,
      ip: meta.ip,
      ua: meta.ua,
      device: meta.device,
      createdAt: now,
      updatedAt: now,
      expiresAt,
      refreshHash,
    };

    const key = sessKey(sessionId);
    await redis.setex(key, REFRESH_EXPIRES, JSON.stringify(payload));
    await redis.sadd(userSessionsKey(userId), sessionId);

    logger.info('session.create', { userId, sessionId, ip: meta.ip, device: meta.device });

    return { sessionId, refreshRaw, expiresIn: REFRESH_EXPIRES };
  },

  /**
   * validateAndRotate:
   *  - token input is expected to be "<sessionId>.<refreshRaw>" OR { sessionId, refreshRaw } pair
   *  - checks session exists
   *  - bcrypt compare raw with stored hash
   *  - if valid -> rotate: generate new raw+hash, update sess:{sessionId} and reset TTL
   *  - if invalid -> treat as possible reuse -> revoke all user sessions and throw
   * returns { userId, sessionId, newRefreshRaw }
   */
  validateAndRotate: async (input: { token?: string; sessionId?: string; refreshRaw?: string }) => {
    let sessionId = input.sessionId;
    let refreshRaw = input.refreshRaw;

    if (!sessionId && input.token) {
      const parts = input.token.split('.');
      sessionId = parts[0];
      refreshRaw = parts.slice(1).join('.');
    }

    if (!sessionId || !refreshRaw) throw new AppError('Invalid refresh token format', 400);

    const key = sessKey(sessionId);
    const raw = await redis.get(key);
    if (!raw) {
      // session not found
      throw new AppError('Refresh token invalid or session expired', 401);
    }

    const sess: SessionMeta = JSON.parse(raw);
    if (!sess.refreshHash) {
      // corrupt session
      await sessionService.revokeSession(sessionId);
      throw new AppError('Session corrupted', 401);
    }

    const ok = await compareHash(refreshRaw, sess.refreshHash);
    if (!ok) {
      // possible token reuse or tampering. Revoke all sessions for this user.
      logger.warn('refresh.reuse_or_invalid', { userId: sess.userId, sessionId });
      await sessionService.revokeAllUserSessions(sess.userId);
      throw new AppError('Refresh token reuse detected. All sessions revoked.', 401);
    }

    // valid -> rotate
    const newRaw = genRefreshRaw();
    const newHash = await hashToken(newRaw);
    sess.refreshHash = newHash;
    sess.updatedAt = Date.now();
    sess.expiresAt = Date.now() + REFRESH_EXPIRES * 1000;

    await redis.setex(key, REFRESH_EXPIRES, JSON.stringify(sess));

    logger.info('session.rotated', { userId: sess.userId, sessionId });

    return { userId: sess.userId, sessionId, newRefreshRaw: newRaw, expiresIn: REFRESH_EXPIRES };
  },

  /**
   * revokeSession:
   *  - deletes sess:{id}
   *  - removes id from user:sessions:{userId} if can read userId
   */
  revokeSession: async (sessionId: string) => {
    const key = sessKey(sessionId);
    const raw = await redis.get(key);
    if (raw) {
      const sess: SessionMeta = JSON.parse(raw);
      await redis.srem(userSessionsKey(sess.userId), sessionId);
    }
    await redis.del(key);
    logger.info('session.revoked', { sessionId });
  },

  /**
   * revokeAllUserSessions:
   *  - reads all sessionIds from user:sessions:{userId}
   *  - deletes all sess:{id} in multi
   *  - deletes the user:sessions set
   */
  revokeAllUserSessions: async (userId: string) => {
    const setKey = userSessionsKey(userId);
    const ids = await redis.smembers(setKey);
    if (ids.length === 0) return;
    const multi = redis.multi();
    ids.forEach((id) => multi.del(sessKey(id)));
    multi.del(setKey);
    await multi.exec();
    logger.info('session.revoke_all', { userId, count: ids.length });
  },

  /**
   * getSessionsForUser:
   *  - returns array of session metadata (excluding refreshHash)
   */
  getSessionsForUser: async (userId: string) => {
    const ids = await redis.smembers(userSessionsKey(userId));
    if (!ids.length) return [];
    const multi = redis.multi();
    ids.forEach((id) => multi.get(sessKey(id)));
    const res = await multi.exec();
    const sessions: SessionMeta[] = (res ?? [])
      .map((r) => r?.[1])
      .filter((val): val is string => typeof val === 'string')
      .map((s) => {
        const parsed = JSON.parse(s) as SessionMeta;
        const { refreshHash: _refreshHash, ...safe } = parsed;
        return safe;
      });

    return sessions;
  },

  /**
   * helper to parse token string "<sessionId>.<refreshRaw>"
   */
  parseCompoundToken: (compound: string) => {
    if (!compound) return null;
    const idx = compound.indexOf('.');
    if (idx === -1) return null;
    const sessionId = compound.slice(0, idx);
    const refreshRaw = compound.slice(idx + 1);
    return { sessionId, refreshRaw };
  },
};

export default sessionService;
