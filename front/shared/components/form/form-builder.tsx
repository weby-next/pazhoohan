"use client";

import React from "react";
import { FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldConfig } from "@/types/form/form-builder";

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
    handleSubmit,
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
          className="block text-sm font-medium text-gray-700"
        >
          {field.label}
          {field.required && <span className="text-red-500"> *</span>}
        </label>

        {field.type === "textarea" && (
          <textarea
            id={field.name}
            {...register(name)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
              errorMessage ? "border-red-500" : ""
            }`}
          />
        )}

        {field.type === "select" && field.options && (
          <select
            id={field.name}
            {...register(name)}
            disabled={field.disabled}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
              errorMessage ? "border-red-500" : ""
            }`}
          >
            {field.options.map((option) => (
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
          <input
            id={field.name}
            type={field.type}
            {...register(name)}
            placeholder={field.placeholder}
            disabled={field.disabled}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${
              errorMessage ? "border-red-500" : ""
            }`}
          />
        )}

        {field.description && (
          <p className="text-gray-500 text-xs mt-1">{field.description}</p>
        )}

        {errorMessage && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map(renderField)}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : submitButtonText}
        </button>
      </div>
    </form>
  );
}

export default FormBuilder;
