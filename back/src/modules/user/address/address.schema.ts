import mongoose from 'mongoose';
import { z } from 'zod';

export const addressSchemaValidator = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50, { message: 'Name must be at most 50 characters' }),
  postalCode: z.string().regex(/^\d{10}$/, { message: 'Postal code must contain 10 digits' }),
  addressLine: z.string().min(5, { message: 'Address line is too short' }).max(200, { message: 'Address line is too long' }),
  loc: z
    .object({
      lat: z.number().min(-90),
      lng: z.number().min(-180).max(180),
    })
    .optional(),
  provinceId: z.number(),
  cityId: z.number(),
  isDefault: z.boolean().default(false),
});

export const createAddressSchema = z.object({
  body: z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }).max(50, { message: 'Name must be at most 50 characters' }),
    postalCode: z.string().regex(/^\d{10}$/, { message: 'Postal code must contain 10 digits' }),
    addressLine: z.string().min(5, { message: 'Address line is too short' }).max(200, { message: 'Address line is too long' }),
    loc: z
      .object({
        lat: z.number().min(-90),
        lng: z.number().min(-180).max(180),
      })
      .optional(),
    provinceId: z.number(),
    cityId: z.number(),
    isDefault: z.boolean().default(false),
  }),
});

export const updateAddressSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(50, { message: 'Name must be at most 50 characters' })
      .optional(),
    postalCode: z
      .string()
      .regex(/^\d{10}$/, { message: 'Postal code must contain 10 digits' })
      .optional(),
    addressLine: z.string().min(5, { message: 'Address line is too short' }).max(200, { message: 'Address line is too long' }).optional(),
    provinceId: z.number().optional(),
    cityId: z.number().optional(),
  }),
});

export const addressIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid address ID'),
  }),
});

export type Address = z.infer<typeof addressSchemaValidator> & {
  _id?: mongoose.Types.ObjectId;
};
export type AddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
export type AddressIdInput = z.infer<typeof addressIdSchema>;
