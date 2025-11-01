export interface Address extends Document {
  province: string;
  city: string;
  district?: string;
  postalCode: string;
  addressLine: string;
  plaque?: string;
  unit?: string;
  description?: string;
}
