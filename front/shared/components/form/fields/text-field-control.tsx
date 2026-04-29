"use client";

import { Controller } from "react-hook-form";
import {
  TextField,
  Label,
  Input,
  FieldError,
  Description,
} from "@heroui/react";

export function TextFieldInput({ field, control }: any) {
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhf, fieldState }) => (
        <TextField
          fullWidth
          isRequired={field.required}
          isInvalid={!!fieldState.error}
        >
          <Label>{field.label}</Label>

          <Input
            {...rhf}
            type={field.type}
            placeholder={field.placeholder}
            disabled={field.disabled}
            fullWidth
            className={field.className}
          />

          {field.description && <Description>{field.description}</Description>}

          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  );
}
