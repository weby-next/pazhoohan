"use client";

import { Controller } from "react-hook-form";
import { Button, Description, InputOTP, Label, TextField } from "@heroui/react";
import { useOtpTimer } from "@/shared/hooks/otp-timer";

export function OTPField({ field, control }: any) {
  const length = field.maxLength ?? 6;

  const { seconds, isExpired, reset, formatted } = useOtpTimer(
    field.timerSeconds ?? 10,
  );

  const handleChange = (value: string, onChange: any) => {
    const numeric = value.replace(/\D/g, "");
    onChange(numeric);

    if (numeric.length === length) {
      field.onComplete?.(numeric);
    }
  };

  return (
    <div>
      <Controller
        name={field.name}
        control={control}
        render={({ field: rhf, fieldState }) => (
          <TextField
            fullWidth
            isRequired={field.required}
            isInvalid={!!fieldState.error}
            className={``}
            dir="ltr"
          >
            <Label>{field.label}</Label>

            <InputOTP
              className={field.className}
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
          </TextField>
        )}
      />

      <Description className="flex p-2 justify-center items-center">
        دریافت نکردید ؟
        {!isExpired ? (
          <p className="m-2">{formatted}</p>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            onPress={() => {
              reset();
              field.onResend?.();
            }}
            className={`m-2`}
          >
            ارسال مجدد
          </Button>
        )}
      </Description>
    </div>
  );
}
