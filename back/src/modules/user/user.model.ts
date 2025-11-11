import mongoose from 'mongoose';
import { User } from './user.types.js';
import addressSchemaModel from './address/address.model.js';

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
    },
    role: {
      type: [String],
      enum: ['customer', 'seller', 'admin'],
      required: true,
    },
    addresses: [addressSchemaModel],
    status: {
      type: String,
      enum: ['active', 'banned'],
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model('User', userSchema);
export default userModel;
