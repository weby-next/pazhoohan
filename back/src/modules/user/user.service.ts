import { User } from './user.types.js';
import { AppError } from '#src/middlewares/error-handler.js';
import userModel from './user.model.js';

const users: User[] = [];

export const clearUsers = () => {
  users.length = 0;
};

export const userService = {
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
