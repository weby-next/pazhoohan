"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { boolean, z, ZodObject } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button } from "@heroui/react";
import { renderField } from "./renderField";
import { FieldConfig } from "@/shared/types/form/form-builder";

export interface FormConfig<TSchema extends ZodObject<any>> {
  fields: FieldConfig[];
  schema: TSchema;

  onSubmit: (data: z.infer<TSchema>) => void | Promise<void>;

  submitButtonText?: string;

  twoColumns?: boolean;
}

function FormBuilder<TSchema extends ZodObject<any>>({
  fields,
  schema,
  onSubmit,
  submitButtonText = "Submit",
  twoColumns = false,
}: FormConfig<TSchema>) {
  type FormValues = z.infer<TSchema>;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as any,
    mode: "onChange",
  });

  const submitHandler: SubmitHandler<FormValues> = async (data) => {
    await onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <div
        className={`grid gap-4 ${
          twoColumns ? "md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {fields.map((field) => renderField(field, control))}
      </div>

      <Button
        type="submit"
        isDisabled={!isValid || isSubmitting}
        fullWidth
        className="mt-4"
      >
        {isSubmitting ? "درحال پردازش..." : submitButtonText}
      </Button>
    </Form>
  );
}

export default FormBuilder;
