import { z } from 'zod';

export const sendOtpSchema = z.object({
  body: z.object({
    phone: z.string().min(7, 'Invalid phone number').max(20),
  }),
});

export const verifyOtpSchema = z.object({
  body: z.object({
    phone: z.string().min(7, 'Invalid phone number').max(20),
    code: z.string().length(6, 'Code must be 6 digits'),
  }),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
