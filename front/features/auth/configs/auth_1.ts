import { FieldConfig } from "@/shared/types/form/form-builder";

export const auth_1FieldConfigPhone: FieldConfig[] = [
  {
    name: "phone_number",
    label: "لطفا شماره تلفن خود را وارد کنید",
    type: "text",
    placeholder: "0912-000-0000",
    required: true,
    description: "شماره تماس با 09 شروع میشود و 11 رقم دارد",
    className: "text-center my-2",
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
    className: "flex mt-2 justify-center",
    timerSeconds: 10,
  },
];
