"use client";

import FormBuilder from "@/shared/components/form/form-builder";
import { Surface } from "@heroui/react";
import { auth_2FieldConfig } from "../configs/auth_2";
import { auth_2SchemaBasicInfo } from "../schemas/auth_2";

export const BasicInfoForm = () => {
  const onSubmit = () => {
    console.log("data");
  };

  return (
    <Surface variant="secondary" className="w-sm p-4 rounded-4xl">
      <h3 className="text-2xl font-bold my-4">اطلاعات پایه</h3>
      <FormBuilder
        fields={auth_2FieldConfig}
        onSubmit={onSubmit}
        schema={auth_2SchemaBasicInfo}
        submitButtonText="بعدی"
        twoColumns
      />
    </Surface>
  );
};
