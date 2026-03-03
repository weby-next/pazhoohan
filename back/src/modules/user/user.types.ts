import { Address } from '#src/modules/user/address/address.schema.js';
import { Document } from 'mongoose';

export interface User extends Document {
  fullName: string;
  phone: string;
  email: string;
  role: ['owner' | 'teacher' | 'admin' | 'model'];
  addresses?: Address[];
  status: 'active' | 'banned';
}

export interface CreateUserDto {
  fullName: string;
  phone: string;
}
