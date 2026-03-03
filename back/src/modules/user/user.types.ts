import { Document } from 'mongoose';

export type UserRole = 'model' | 'instructor';
export type UserStatus = 'active' | 'rejected' | 'pending_review';
export type WorkSituation = 'unemployed' | 'student' | 'employed' | 'other';
export type Category = 'fashion' | 'sportswear' | 'formal' | 'casual' | 'runway' | 'editorial' | 'beauty' | 'others';

export interface UserDocument extends Document {
  phone: string;

  fullName: string;
  nationalCode?: string;
  nationality: string;
  gender: 'male' | 'female';
  birthDate: Date;
  isMarried: boolean;
  workSituation: WorkSituation;
  instagram?: string;

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
  };

  status: UserStatus;
  registrationStep: number;
}

export interface RegistrationState {
  _id: string;

  role?: UserRole;
  activitySelection?: {
    roleType: UserRole;
    primaryCategory: Category;
  };
  basicInfo?: {
    fullName: string;
    nationality: string;
    gender: 'male' | 'female';
    birthDate: Date;
    isMarried: boolean;
    workSituation: WorkSituation;
    instagram?: string;
  };
  technicalInfo?: {
    height_cm: number;
    weight_kg: number;
    skinColor: string;
    eyeColor: string;
    hairColor: string;
  };
  photoPaths?: {
    fullBodyUrl: string;
    fullShotUrl: string;
  };

  currentStep: number;
}

export interface RequestOtpDto {
  phone: string;
}
export interface VerifyOtpDto {
  phone: string;
  otp: string;
}

export interface Step1Dto {
  role: UserRole;
}

export interface Step2Dto {
  roleType: UserRole;
  primaryCategory: Category;
}

export interface Step3Dto {
  fullName: string;
  nationality: string;
  gender: 'male' | 'female';
  birthDate: string;
  isMarried: boolean;
  workSituation: WorkSituation;
  instagramHandle?: string;
}

export interface Step4Dto {
  height_cm: number;
  weight_kg: number;
  skinColor: string;
  eyeColor: string;
  hairColor: string;
}

export interface Step5Dto {
  fullBodyUrl: string;
  fullShotUrl: string;
}
