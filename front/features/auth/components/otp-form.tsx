"use client";

import FormBuilder from "@/shared/components/form/form-builder";
import { auth_1FieldConfigOtp } from "../configs/auth_1";
import { auth_1SchemaPhone } from "../schemas/auth_1";
import { Pen } from "lucide-react";
import { Button, Surface } from "@heroui/react";

export const OtpForm = () => {
  const onSubmit = () => {
    console.log("data");
  };

  return (
    <Surface variant="secondary" className="w-sm p-4 rounded-4xl">
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
    </Surface>
  );
};
