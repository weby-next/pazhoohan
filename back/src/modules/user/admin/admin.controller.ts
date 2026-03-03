import { Request, Response } from 'express';
import { adminService } from './admin.service.js';
import { GetAllUsersInput, UserIdInput } from '../user.schema.js';

export const adminController = {
  getAllUsers: async (
    req: Request<Record<string, unknown>, Record<string, unknown>, unknown, GetAllUsersInput['query']>,
    res: Response,
  ) => {
    const { page, limit, sort } = req.query;

    const filter: Record<string, unknown> = {};

    const result = await adminService.getAllUsers({
      page: Number(page),
      limit: Number(limit),
      sort,
      filter,
    });

    res.success(result, 'Users fetched successfully');
  },

  banUser: async (req: Request<UserIdInput['params']>, res: Response) => {
    const user = await adminService.banUser(req.params.id);
    res.success(user, 'User banned successfully');
  },

  unbanUser: async (req: Request<UserIdInput['params']>, res: Response) => {
    const user = await adminService.unbanUser(req.params.id);
    res.success(user, 'User unbanned successfully');
  },
};
