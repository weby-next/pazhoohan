"use client";

import { Controller } from "react-hook-form";
import {
  RadioGroup,
  Radio,
  Label,
  Description,
  FieldError,
  Surface,
} from "@heroui/react";

export function RadioField({ field, control }: any) {
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhf, fieldState }) => (
        <RadioGroup
          value={rhf.value}
          variant="secondary"
          onChange={rhf.onChange}
          className={``}
        >
          <Label className="text-start mb-1">{field.label}</Label>

          <Surface className="flex items-start gap-6 p-2 rounded-xl">
            {field.options?.map((opt: any) => (
              <Radio key={opt.value} value={opt.value} className={`m-0`}>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>

                <Radio.Content>
                  <Label>{opt.label}</Label>
                  {opt.description && (
                    <Description>{opt.description}</Description>
                  )}
                </Radio.Content>
              </Radio>
            ))}
          </Surface>

          <FieldError>{fieldState.error?.message}</FieldError>
        </RadioGroup>
      )}
    />
  );
}
