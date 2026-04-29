"use client";

import { Controller } from "react-hook-form";
import { InputOTP } from "@heroui/react";

export function OTPField({ field, control }: any) {
  const length = field.maxLength ?? 6;

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhf }) => (
        <InputOTP
          className="flex justify-center"
          maxLength={length}
          value={rhf.value}
          onChange={(value) => {
            rhf.onChange(value);
            if (value.length === length) {
              field.onComplete?.(value);
            }
          }}
        >
          <InputOTP.Group>
            {Array.from({ length }).map((_, i) => (
              <InputOTP.Slot key={i} index={i} />
            ))}
          </InputOTP.Group>
        </InputOTP>
      )}
    />
  );
}
