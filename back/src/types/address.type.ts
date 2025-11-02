export interface Address extends Document {
  name: string;
  postalCode: string;
  loc: {
    lat: string;
    lng: string;
  };
  addressLine: string;
  cityId: string;
}
