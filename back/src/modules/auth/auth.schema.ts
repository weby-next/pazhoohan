import { z } from 'zod';

export const sendOtpSchema = z.object({
  body: z.object({
    phone: z.string().regex(/^(\+98|0)?9\d{9}$/, 'Invalid phone number'),
  }),
});

export const verifyOtpSchema = z.object({
  body: z.object({
    phone: z.string().regex(/^(\+98|0)?9\d{9}$/, 'Invalid phone number'),
    code: z.string().length(6, 'Code must be 6 digits'),
  }),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
