import { z } from "zod";

export const auth_1SchemaPhone = z.object({
  phone_number: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره موبایل باید 11 رقم و با 09 شروع شود"),
});

export const auth_1SchemaOtp = z.object({
  otp: z.string().regex(/^\d{6}$/, "کد تایید باید 6 رقم باشد"),
});

export type Auth_1PhoneType = z.infer<typeof auth_1SchemaPhone>;
export type Auth_1OtpType = z.infer<typeof auth_1SchemaOtp>;
