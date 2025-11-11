import { User } from './user.types.js';
import { AppError } from '#src/middlewares/error-handler.js';
import userModel from './user.model.js';
import { Address } from './address/address.schema.js';
import cities from '#src/assets/cities.json' with { type: 'json' };
import provinces from '#src/assets/provinces.json' with { type: 'json' };
import { Document } from 'mongoose';

const users: User[] = [];

export const clearUsers = () => {
  users.length = 0;
};

export const userService = {
  createAddress: async (data: Address, userId: User['_id']): Promise<Document | null> => {
    const province = provinces.find((p) => p.id === data.provinceId);
    if (!province) throw new AppError('Province not found', 404);

    const city = cities.find((c) => c.id === data.cityId);
    if (!city) throw new AppError('City not found', 404);

    if (city.province_id !== province.id) {
      throw new AppError('City does not belong to the selected province', 400);
    }

    if (data.isDefault) {
      await userModel.updateOne({ _id: userId, 'addresses.isDefault': true }, { $set: { 'addresses.$[].isDefault': false } });
    }

    const newAddress = await userModel.findByIdAndUpdate(userId, { $push: { addresses: data } }, { new: true });

    return newAddress;
  },

  banUser: async (id: string): Promise<void> => {
    const user = await userModel.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.status === 'banned') {
      throw new AppError('User is already banned', 409);
    }

    user.status = 'banned';
    await user.save();
  },

  unbanUser: async (id: string): Promise<void> => {
    const user = await userModel.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (user.status === 'active') {
      throw new AppError('User is already active', 409);
    }

    user.status = 'active';
    await user.save();
  },
};
