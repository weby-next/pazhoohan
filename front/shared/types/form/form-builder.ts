export interface FieldOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface FieldConfig {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "textarea"
    | "otp"
    | "select"
    | "number"
    | "checkbox"
    | "radio"
    | "date";

  placeholder?: string;
  defaultValue?: any;
  options?: FieldOption[];
  required?: boolean;
  disabled?: boolean;
  description?: string;
  className?: string;

  maxLength?: number;
  pattern?: string;

  onComplete?: (value: string) => void;
}
