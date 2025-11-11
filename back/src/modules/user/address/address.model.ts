import mongoose from 'mongoose';
import { Address } from './address.schema.js';

const addressSchemaModel = new mongoose.Schema<Address>(
  {
    name: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    loc: {
      lat: {
        type: String,
      },
      lng: {
        type: String,
      },
    },
    addressLine: {
      type: String,
      required: true,
    },
    provinceId: {
      type: Number,
      required: true,
    },
    cityId: {
      type: Number,
      required: true,
    },
    isDefault: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

export default addressSchemaModel;
