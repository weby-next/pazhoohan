export interface Address extends Document {
  name: string;
  postalCode: string;
  loc: {
    lat: number;
    lng: number;
  };
  addressLine: string;
  provinceId: number;
  cityId: number;
  isDefault: boolean;
}
