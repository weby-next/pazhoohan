import bcrypt from 'bcryptjs';
import redis from '#src/config/redis.js';
import { AppError } from '#src/middlewares/error-handler.js';
import userModel from '#src/modules/user/user.model.js';
import { ENV } from '#src/config/env.js';

const redisKey = {
  otp: (p: string) => `otp:${p}:hash`,
  sends: (p: string) => `otp:${p}:sends`,
  attempts: (p: string) => `otp:${p}:attempts`,
};

const genCode = (len = 6) => Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join('');

export const authService = {
  sendOtp: async (phone: string) => {
    const sends = Number((await redis.get(redisKey.sends(phone))) || '0');
    if (sends >= ENV.MAX_SENDS_PER_HOUR) {
      throw new AppError('Too many OTP requests', 429);
    }

    const code = genCode();
    const hash = await bcrypt.hash(code, ENV.SALT_ROUNDS);
    await redis.setex(redisKey.otp(phone), ENV.OTP_TTL, hash);
    await redis.multi().incr(redisKey.sends(phone)).expire(redisKey.sends(phone), 3600).exec();
    await redis.del(redisKey.attempts(phone));

    //! it`s just for develompent - change to SMS provider
    console.log(`[OTP] code=${code} phone=${phone}`);

    return { message: 'OTP sent successfully', ttl: ENV.OTP_TTL };
  },

  verifyOtp: async (phone: string, code: string) => {
    const hash = await redis.get(redisKey.otp(phone));
    if (!hash) throw new AppError('OTP expired or not found', 410);

    const attempts = Number((await redis.get(redisKey.attempts(phone))) || '0');
    if (attempts >= ENV.MAX_VERIFY_ATTEMPTS) throw new AppError('Too many failed attempts', 429);

    const valid = await bcrypt.compare(code, hash);
    if (!valid) {
      await redis.incr(redisKey.attempts(phone));
      await redis.expire(redisKey.attempts(phone), ENV.OTP_TTL);
      throw new AppError('Invalid code', 400);
    }

    await redis.del(redisKey.otp(phone));
    await redis.del(redisKey.attempts(phone));
    await redis.del(redisKey.sends(phone));

    let user = await userModel.findOne({ phone });
    if (!user) {
      user = await userModel.create({ fullName: phone, phone, role: ['customer'], status: 'active' } as any);
    }

    return { message: 'OTP verified', user };
  },

  getMe: async (id: string) => {
    const user = await userModel.findById(id);
    return { message: 'user fetched', user };
  },
};
