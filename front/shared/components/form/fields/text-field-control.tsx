"use client";

import { Controller, useWatch } from "react-hook-form";
import {
  TextField,
  Label,
  Input,
  FieldError,
  Description,
} from "@heroui/react";

export function TextFieldInput({ field, control }: any) {
  let label = field.label;
  let placeholder = field.placeholder;
  let maxLength = field.maxLength;
  let disabled = field.disabled;

  // فقط اگر فیلد dynamicIdentifier داشته باشد
  if (field.dynamicIdentifier) {
    const national = useWatch({
      control,
      name: field.dynamicIdentifier.dependsOn,
    });

    if (!national) {
      label = field.dynamicIdentifier.defaultLabel ?? label;
      placeholder = field.dynamicIdentifier.defaultPlaceholder ?? placeholder;
      disabled = true;
    } else {
      const config = field.dynamicIdentifier.map[national];

      if (config) {
        label = config.label ?? label;
        placeholder = config.placeholder ?? placeholder;
        maxLength = config.maxLength ?? maxLength;
        disabled = false;
      }
    }
  }

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
          <Label className="text-start">{label}</Label>

          <Input
            {...rhf}
            type="text"
            value={rhf.value ?? ""}
            placeholder={placeholder}
            disabled={disabled}
            fullWidth
            className={field.className}
            maxLength={maxLength}
            onChange={(e) => {
              let value = e.target.value;

              if (field.numericOnly) {
                value = value.replace(/\D/g, "");
              }

              rhf.onChange(value);
            }}
          />

          {field.description && <Description>{field.description}</Description>}

          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  );
}
