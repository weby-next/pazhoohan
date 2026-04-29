"use client";

import React from "react";
import {
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldConfig } from "@/shared/types/form/form-builder";
import { Button, Input, InputOTP, TextArea, TextField } from "@heroui/react";
import { Controlled } from "@/features/auth/funcs/otp_timer";

export interface FormConfig<TSchema extends z.ZodObject<any, any>> {
  fields: FieldConfig[];
  schema: TSchema;
  onSubmit: (data: z.infer<TSchema>) => void | Promise<void>;
  submitButtonText?: string;
  title?: string;
  description?: string;
}

function FormBuilder<TSchema extends z.ZodTypeAny>({
  fields,
  schema,
  onSubmit,
  submitButtonText = "Submit",
}: FormConfig<any>) {
  type FormValues = z.infer<TSchema>;

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(schema),
  });

  const renderField = (field: FieldConfig) => {
    const name = field.name as Path<FormValues>;
    const errorMessage = errors[name]?.message as string | undefined;

    return (
      <div key={field.name} className="mb-4">
        <label
          htmlFor={field.name}
          className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark"
        >
          {field.label}
        </label>

        {field.type === "textarea" && (
          <TextArea
            id={field.name}
            {...register(name)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={`mt-1 block w-full rounded-md ${
              errorMessage ? "border-red-500" : ""
            }`}
          />
        )}

        {field.type === "otp" && <Controlled />}

        {field.type === "select" && field.options && (
          <select
            id={field.name}
            {...register(name)}
            disabled={field.disabled}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
              errorMessage ? "border-red-500" : ""
            }`}
          >
            {field.options.map((option: any) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        )}

        {["text", "email", "number", "password"].includes(field.type) && (
          <TextField>
            <Input placeholder="0912-000-0000" />
          </TextField>
          // <Input
          //   id={field.name}
          //   size="lg"
          //   type={field.type}
          //   radius="full"
          //   {...register(name)}
          //   placeholder={field.placeholder}
          //   disabled={field.disabled}
          //   className={`mt-1 block w-full border-gray-300 ${
          //     errorMessage ? "border-red-500" : ""
          //   }`}
          // />
        )}

        {errorMessage && field.type !== "otp" && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map(renderField)}

      <div className="flex justify-end">
        <Button fullWidth type="submit">
          {isSubmitting ? "درحال پردازش ..." : submitButtonText}
        </Button>
      </div>
    </form>
  );
}

export default FormBuilder;
