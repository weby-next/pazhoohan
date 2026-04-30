import { z } from "zod";

export const auth_2SchemaBasicInfo = z
  .object({
    "basic-info_firstname": z
      .string()
      .trim()
      .min(2, "نام باید حداقل 2 کاراکتر باشد")
      .regex(
        /^[آابپتثجچحخدذرزسشصضطظعغفقکگلمنوهیa-zA-Z\s]+$/,
        "نام فقط باید شامل حروف باشد",
      ),

    "basic-info_lastname": z
      .string()
      .trim()
      .min(2, "نام خانوادگی باید حداقل 2 کاراکتر باشد")
      .regex(
        /^[آابپتثجچحخدذرزسشصضطظعغفقکگلمنوهیa-zA-Z\s]+$/,
        "نام خانوادگی فقط باید شامل حروف باشد",
      ),

    "basic-info_gender": z.enum(["male", "female"], {
      error: "انتخاب جنسیت الزامی است",
    }),

    "basic-info_birth-day": z
      .any()
      .refine((v) => v !== undefined && v !== null, "تاریخ تولد الزامی است"),

    "basic-info_national": z.enum(["irani", "kardo"], {
      error: "انتخاب ملیت الزامی است",
    }),

    "basic-info_identifier": z.string().regex(/^\d+$/, "فقط عدد مجاز است"),
  })
  .superRefine((data, ctx) => {
    const national = data["basic-info_national"];
    const identifier = data["basic-info_identifier"];

    if (national === "irani") {
      if (!/^\d{10}$/.test(identifier)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["basic-info_identifier"],
          message: "کد ملی باید ۱۰ رقم باشد",
        });
      }
    }

    if (national === "kardo") {
      if (!/^\d{12}$/.test(identifier)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["basic-info_identifier"],
          message: "کد فراگیر اتباع باید ۱۲ رقم باشد",
        });
      }
    }
  });

export type Auth_2BasicInfoType = z.infer<typeof auth_2SchemaBasicInfo>;
