import { Request, Response } from 'express';
import { adminService } from './admin.service.js';
import { UserIdInput } from '../user.schema.js';

export const adminController = {
  banUser: async (req: Request<UserIdInput['params']>, res: Response) => {
    const user = await adminService.banUser(req.params.id);
    res.success(user, 'User banned successfully');
  },

  unbanUser: async (req: Request<UserIdInput['params']>, res: Response) => {
    const user = await adminService.unbanUser(req.params.id);
    res.success(user, 'User Unbanned successfully');
  },
};
