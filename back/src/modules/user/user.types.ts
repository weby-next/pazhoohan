import { Address } from '#src/types/address.type.js';
import { Document } from 'mongoose';

export interface User extends Document {
  fullName: string;
  phone: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  address: Address;
  isVerified: boolean;
  status: 'active' | 'banned';
}

export interface CreateUserDto {
  fullName: string;
  phone: string;
}
