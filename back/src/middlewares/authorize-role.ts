import { Request, Response, NextFunction } from 'express';
import { AppError } from './error-handler.js';
import { User } from '#src/modules/user/user.types.js';

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authorizeRole =
  (...allowedRoles: Array<'owner' | 'teacher' | 'admin' | 'model'>) =>
  (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Unauthorized: No user in request', 401));
    }

    const userRoles = req.user.role;
    if (!Array.isArray(userRoles)) {
      return next(new AppError('Invalid user role format', 500));
    }

    const hasPermission = userRoles.some((r) => allowedRoles.includes(r));
    if (!hasPermission) {
      return next(new AppError('Forbidden: Insufficient permissions', 403));
    }

    next();
  };
