import { LoginFormValues, loginSchema } from "@/app/schemas/auth";
import { FormConfig } from "@/components/form/form-builder";
import { FieldConfig } from "@/types/form/form-builder";

const loginFields: FieldConfig[] = [
  {
    name: "email",
    label: "ایمیل",
    type: "email",
    placeholder: "your.email@example.com",
    required: true,
  },
  {
    name: "password",
    label: "رمز عبور",
    type: "password",
    placeholder: "********",
    required: true,
  },
];

export const loginFormConfig: FormConfig<LoginFormValues, typeof loginSchema> =
  {
    fields: loginFields,
    schema: loginSchema,
    onSubmit: async (data: string) => {
      console.log("Form submitted:", data);
    },
    submitButtonText: "ورود به حساب کاربری",
  };
