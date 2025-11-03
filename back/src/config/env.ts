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
  OTP_TTL: z.number().default(300),
  SALT_ROUNDS: z.number().default(10),
  MAX_SENDS_PER_HOUR: z.number().default(3),
  MAX_VERIFY_ATTEMPTS: z.number().default(5),
});

export const ENV = envSchema.parse(process.env);

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
