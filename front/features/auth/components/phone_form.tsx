"use client";

import FormBuilder from "@/shared/components/form/form-builder";
import { auth_1FieldConfigPhone } from "../configs/auth_1";
import { auth_1SchemaPhone } from "../schemas/auth_1";
import { Divider } from "@heroui/divider";

export const PhoneForm = () => {
  const onSubmit = () => {
    console.log("data");
  };

  return (
    <div className="bg-base-light z-[9999] w-[25rem] p-6 dark:bg-base-dark shadow-2xl rounded-4xl">
      <p className="text-primary">
        وقتشه بیای جلوی دوربین ، پول دربیاری و بدرخشی !
      </p>
      <Divider className="my-4" />
      <h3 className="text-2xl font-bold my-4">ورود | ثبت نام</h3>
      <FormBuilder
        fields={auth_1FieldConfigPhone}
        onSubmit={onSubmit}
        schema={auth_1SchemaPhone}
        submitButtonText="ارسال کد تایید"
      />
      <p className="text-sm text-text-tertiary-light my-2 text-right">
        ورود و ثبت‌نام در لومینه به معنای پذیرش شرایط و مقررات و قوانین حریم
        خصوصی است.
      </p>
    </div>
  );
};
