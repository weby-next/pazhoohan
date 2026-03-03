import { AppError } from '#src/middlewares/error-handler.js';
import userModel from '../user.model.js';

export const adminService = {
  getAllUsers: async ({
    page = 1,
    limit = 10,
    sort = '-createdAt',
    filter = {},
    projection = null,
  }: {
    page?: number;
    limit?: number;
    sort?: string;
    filter?: Record<string, unknown>;
    projection?: Record<string, 1 | 0> | null;
  }) => {
    const safePage = Math.max(1, Number(page));
    const safeLimit = Math.max(1, Math.min(Number(limit), 100));

    const skip = (safePage - 1) * safeLimit;

    const totalCount = await userModel.countDocuments(filter);

    const users = await userModel.find(filter, projection).sort(sort).skip(skip).limit(safeLimit).lean();

    const totalPages = Math.ceil(totalCount / safeLimit);

    return {
      data: users,
      pagination: {
        page: safePage,
        limit: safeLimit,
        totalPages,
        totalCount,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
      },
    };
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
