"use client";

import { Controller } from "react-hook-form";
import {
  Calendar,
  DateField,
  DatePicker,
  Label,
  FieldError,
} from "@heroui/react";
import { I18nProvider } from "react-aria-components";
import { getLocalTimeZone } from "@internationalized/date";
import { ChevronDown } from "lucide-react";

export function DatePickerField({ field, control }: any) {
  return (
    <I18nProvider locale="fa-IR-u-ca-persian">
      <Controller
        name={field.name}
        control={control}
        render={({ field: rhf, fieldState }) => (
          <DatePicker
            value={rhf.value}
            onChange={rhf.onChange}
            granularity="day"
          >
            <Label className="text-start">{field.label}</Label>

            <DateField.Group fullWidth dir="ltr">
              <DateField.Input>
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>

              <DateField.Suffix>
                <DatePicker.Trigger>
                  <DatePicker.TriggerIndicator />
                </DatePicker.Trigger>
              </DateField.Suffix>
            </DateField.Group>

            <DatePicker.Popover>
              <Calendar aria-label={field.label}>
                <Calendar.Header>
                  <Calendar.YearPickerTrigger>
                    <Calendar.YearPickerTriggerHeading />
                    <ChevronDown size={12} />
                  </Calendar.YearPickerTrigger>

                  <Calendar.NavButton slot="next" />
                  <Calendar.NavButton slot="previous" />
                </Calendar.Header>

                <Calendar.Grid>
                  <Calendar.GridHeader>
                    {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                  </Calendar.GridHeader>

                  <Calendar.GridBody>
                    {(date) => <Calendar.Cell date={date} />}
                  </Calendar.GridBody>
                </Calendar.Grid>

                <Calendar.YearPickerGrid>
                  <Calendar.YearPickerGridBody>
                    {({ year }) => <Calendar.YearPickerCell year={year} />}
                  </Calendar.YearPickerGridBody>
                </Calendar.YearPickerGrid>
              </Calendar>
            </DatePicker.Popover>

            <FieldError>{fieldState.error?.message}</FieldError>
          </DatePicker>
        )}
      />
    </I18nProvider>
  );
}
