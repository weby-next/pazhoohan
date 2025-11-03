import { Redis } from 'ioredis';
import { ENV } from './env.js';

const redis = new Redis(ENV.REDIS_URI);

export default redis;
