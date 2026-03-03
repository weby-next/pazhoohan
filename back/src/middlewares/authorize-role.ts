import { Request, Response, NextFunction } from 'express';
import { AppError } from './error-handler.js';

interface AuthenticatedRequest extends Request {
  user?: { role: 'model' | 'instructor' };
}

type AllowedRole = 'model' | 'instructor';

export const authorizeRole =
  (...allowedRoles: AllowedRole[]) =>
  (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Unauthorized: No user in request', 401));
    }

    const userRole = req.user.role;

    const hasPermission = allowedRoles.includes(userRole as AllowedRole);

    if (!hasPermission) {
      return next(new AppError('Forbidden: Insufficient permissions', 403));
    }

    next();
  };
