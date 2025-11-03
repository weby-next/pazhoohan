import { Redis } from 'ioredis';
import { ENV } from './env.js';
import { logger } from '#src/middlewares/logger.js';

const redis = new Redis(ENV.REDIS_URI);

redis.on('error', (err) => logger.error('Redis Error', { err }));
redis.on('connect', () => logger.info('Redis connected'));

export default redis;
