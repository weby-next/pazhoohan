import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000').transform(Number),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly']).default('info'),
  MONGO_URI: z.string().default('mongodb://localhost:27017/pazhoohan'),
  REDIS_URI: z.string().default('redis://localhost:6379'),
  OTP_TTL: z.string().default('300').transform(Number),
  SALT_ROUNDS: z.string().default('10').transform(Number),
  MAX_SENDS_PER_HOUR: z.string().default('3').transform(Number),
  MAX_VERIFY_ATTEMPTS: z.string().default('5').transform(Number),
  JWT_ACCESS_SECRET: z.string(),
  ACCESS_EXPIRES_IN: z.string().default('900').transform(Number),
  REFRESH_TOKEN_BYTES: z.string().default('48').transform(Number),
  COOKIE_SECURE: z.string().default('false'),
  COOKIE_DOMAIN: z.string().default('localhost'),
  REFRESH_EXPIRES_IN: z.string().default('604800').transform(Number),
});

export const ENV = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
