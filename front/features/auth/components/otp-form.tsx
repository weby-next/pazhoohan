"use client";

import FormBuilder from "@/shared/components/form/form-builder";
import { auth_1FieldConfigOtp } from "../configs/auth_1";
import { auth_1SchemaPhone } from "../schemas/auth_1";
import { Pen } from "lucide-react";
import { Button } from "@heroui/react";

export const OtpForm = () => {
  const onSubmit = () => {
    console.log("data");
  };

  return (
    <div className="bg-base-light z-[9999] w-[25rem] p-6 dark:bg-base-dark shadow-2xl rounded-4xl">
      <h3 className="text-2xl font-bold my-4">کد تایید را وارد کنید</h3>
      <Button className="mb-2 font-bold" variant="secondary">
        09927808606
        <Pen className="w-4 h-4" />
      </Button>
      <FormBuilder
        fields={auth_1FieldConfigOtp}
        onSubmit={onSubmit}
        schema={auth_1SchemaPhone}
        submitButtonText="تایید کد و ادامه"
      />
    </div>
  );
};
