"use client";

import FormBuilder from "@/shared/components/form/form-builder";
import { auth_1FieldConfigOtp } from "../configs/auth_1";
import { auth_1SchemaPhone } from "../schemas/auth_1";
import { Pen } from "lucide-react";
import { Button, Surface } from "@heroui/react";
import Link from "next/link";

export const OtpForm = () => {
  const onSubmit = () => {
    console.log("data");
  };

  return (
    <Surface variant="secondary" className="w-sm p-4 rounded-4xl">
      <h3 className="text-2xl font-bold my-4">کد تایید را وارد کنید</h3>
      <Surface
        variant="transparent"
        className="w-full mb-2 flex justify-center items-center"
      >
        <Link
          className="flex w-fit p-2 rounded-full dark:text-accent-dark text-accent-hover-light bg-surface-elevated-light dark:bg-surface-primary-dark items-center justify-center gap-2 font-bold"
          href="/auth"
        >
          09927808606
          <Pen className="w-4 h-4" />
        </Link>
      </Surface>
      <FormBuilder
        fields={auth_1FieldConfigOtp}
        onSubmit={onSubmit}
        schema={auth_1SchemaPhone}
        submitButtonText="تایید کد و ادامه"
      />
    </Surface>
  );
};
