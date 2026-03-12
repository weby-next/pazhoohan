import mongoose from 'mongoose';

import { UserRole, UserStatus, WorkSituation, Category } from '#src/modules/user/user.types.js';

export interface UserDocument extends mongoose.Document {
  phone: string;
  fullName: string;
  nationalCode?: string;
  nationality: string;
  gender: 'male' | 'female';
  birthDate: Date;
  isMarried: boolean;
  workSituation: WorkSituation;
  instagramHandle?: string;

  role: UserRole;
  primaryCategory?: Category;
  categories?: Category[];

  physicalData: {
    height_cm: number;
    weight_kg: number;
    skinColor: string;
    eyeColor: string;
    hairColor: string;
  };

  uploadedPictures: {
    fullBodyUrl: string;
    fullShotUrl: string;
    profilePhotoUrl?: string;
  };

  status: UserStatus;
  registrationStep: number;
}

const physicalDataSchema = new mongoose.Schema(
  {
    height_cm: { type: Number, required: true },
    weight_kg: { type: Number, required: true },
    skinColor: { type: String, required: true },
    eyeColor: { type: String, required: true },
    hairColor: { type: String, required: true },
  },
  { _id: false },
);

const uploadedPicturesSchema = new mongoose.Schema(
  {
    fullBodyUrl: { type: String, required: true },
    fullShotUrl: { type: String, required: true },
    profilePhotoUrl: { type: String },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema<UserDocument>(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    nationalCode: {
      type: String,
      required: false,
    },
    nationality: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    isMarried: {
      type: Boolean,
      required: true,
    },
    workSituation: {
      type: String,
      enum: ['unemployed', 'student', 'employed', 'other'],
      required: true,
    },
    instagramHandle: {
      type: String,
      required: false,
    },

    role: {
      type: String,
      enum: ['model', 'instructor'],
      required: true,
    },
    categories: {
      type: [String],
      enum: ['fashion', 'sportswear', 'formal', 'casual', 'runway', 'editorial', 'beauty', 'others'],
      required: false,
    },

    physicalData: {
      type: physicalDataSchema,
      required: true,
    },

    uploadedPictures: {
      type: uploadedPicturesSchema,
      required: true,
    },

    status: {
      type: String,
      enum: ['active', 'rejected', 'pending_review'],
      default: 'pending_review',
    },
    registrationStep: {
      type: Number,
      required: true,
      min: 0,
      max: 6,
      default: 0,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model<UserDocument>('User', userSchema);
export default userModel;
