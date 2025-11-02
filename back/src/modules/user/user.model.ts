import mongoose from 'mongoose';
import { User } from './user.types.js';
import { Address } from '#src/types/address.type.js';

const addressSchema = new mongoose.Schema<Address>(
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
        required: true,
      },
      lng: {
        type: String,
        required: true,
      },
    },
    addressLine: {
      type: String,
      required: true,
    },
    cityId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const userSchema = new mongoose.Schema<User>(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    role: {
      type: [String],
      enum: ['customer', 'seller', 'admin'],
      required: true,
    },
    addresses: {
      type: [addressSchema],
    },
    status: {
      type: String,
      enum: ['active', 'banned'],
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model('User', userSchema);
export default userModel;
