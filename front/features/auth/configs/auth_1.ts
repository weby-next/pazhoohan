import { FieldConfig } from "@/shared/types/form/form-builder";

export const auth_1FieldConfigPhone: FieldConfig[] = [
  {
    name: "phone_number",
    label: "لطفا شماره تلفن خود را وارد کنید",
    type: "text",
    placeholder: "شماره تلفن",
    required: true,
    description: "شماره تماس با 09 شروع میشود و 11 رقم دارد",
    className: "w-[20rem]",
  },
];

export const auth_1FieldConfigOtp: FieldConfig[] = [
  {
    name: "otp",
    label: "کد ارسال شده به شماره بالا را وارد کنید",
    type: "otp",
    required: true,
    description:
      "در صورت عدم دریافت کد، پوشه هرزنامه (spam) خود را بررسی کنید.",
    maxLength: 6,
  },
];
