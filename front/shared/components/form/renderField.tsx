import { TextFieldInput } from "./fields/text-field-control";
import { TextAreaField } from "./fields/text-area-control";
import { SelectField } from "./fields/select-control";
import { OTPField } from "./fields/otp-field-control";
import { RadioField } from "./fields/radio-control";
import { DatePickerField } from "./fields/date-picker-control";

export function renderField(field: any, control: any) {
  switch (field.type) {
    case "textarea":
      return <TextAreaField key={field.name} field={field} control={control} />;

    case "select":
      return <SelectField key={field.name} field={field} control={control} />;

    case "otp":
      return <OTPField key={field.name} field={field} control={control} />;

    case "radio":
      return <RadioField key={field.name} field={field} control={control} />;

    case "date":
      return <DatePickerField field={field} control={control} />;

    default:
      return (
        <TextFieldInput key={field.name} field={field} control={control} />
      );
  }
}
