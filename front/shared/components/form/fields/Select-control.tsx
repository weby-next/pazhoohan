"use client";

import { Controller } from "react-hook-form";
import { Select, Label, ListBox, FieldError } from "@heroui/react";

export function SelectField({ field, control }: any) {
  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhf, fieldState }) => (
        <Select
          selectedKey={rhf.value}
          onSelectionChange={(key) => rhf.onChange(key)}
        >
          <Label>{field.label}</Label>

          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {field.options?.map((opt: any) => (
                <ListBox.Item
                  key={opt.value}
                  id={String(opt.value)}
                  textValue={opt.label}
                >
                  {opt.label}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>

          <FieldError>{fieldState.error?.message}</FieldError>
        </Select>
      )}
    />
  );
}
