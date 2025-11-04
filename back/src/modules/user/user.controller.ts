import { Request, Response } from 'express';

import { userService } from './user.service.js';
import { UserIdInput } from './user.schema.js';

export const userController = {
  banUser: async (req: Request<UserIdInput['params']>, res: Response) => {
    const user = await userService.banUser(req.params.id);
    res.success(user, 'User banned successfully');
  },

  unbanUser: async (req: Request<UserIdInput['params']>, res: Response) => {
    const user = await userService.unbanUser(req.params.id);
    res.success(user, 'User Unbanned successfully');
  },
};
