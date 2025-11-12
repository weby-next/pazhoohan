import { Request, Response } from 'express';

import { userService } from './user.service.js';
import { UserIdInput } from './user.schema.js';
import { AddressInput, AddressIdInput } from './address/address.schema.js';
import mongoose from 'mongoose';

export const userController = {
  createAddress: async (req: Request<Record<string, never>, unknown, AddressInput['body']>, res: Response) => {
    const user = req.user;
    const address = await userService.createAddress(req.body, user._id);

    res.success(address, 'Address created successfully');
  },

  changeAddressToDefault: async (req: Request<AddressIdInput['params']>, res: Response) => {
    const user = req.user;

    const addressId = new mongoose.Types.ObjectId(req.params.id);
    const resualt = await userService.changeAddressToDefault(addressId, user._id);

    res.success(resualt, 'Address seted to default successfully');
  },

  deleteAddress: async (req: Request<AddressIdInput['params']>, res: Response) => {
    const user = req.user;

    const addressId = new mongoose.Types.ObjectId(req.params.id);
    const resualt = await userService.deleteAddress(addressId, user._id);

    res.success(resualt, 'Address deleted successfully');
  },

  // todo_ Ban -> move to another dir
  banUser: async (req: Request<UserIdInput['params']>, res: Response) => {
    const user = await userService.banUser(req.params.id);
    res.success(user, 'User banned successfully');
  },

  unbanUser: async (req: Request<UserIdInput['params']>, res: Response) => {
    const user = await userService.unbanUser(req.params.id);
    res.success(user, 'User Unbanned successfully');
  },
};
