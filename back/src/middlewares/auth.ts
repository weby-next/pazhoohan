import { ENV } from '#src/config/env.js';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './error-handler.js';
import userModel from '#src/modules/user/user.model.js';

const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new AppError('Missing or invalid Authorization header', 401);

    const token = authHeader.split(' ')[1];
    if (!token) throw new AppError('Missing access token', 401);
    const decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET);

    const user = await userModel.findById(decoded.sub);
    if (!user) throw new AppError('User not found', 404);
    if (user.status === 'rejected') throw new AppError('This user has been rejected', 403);

    req.user = user;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw new AppError('Access token expired', 401);
    }
    if (err.name === 'JsonWebTokenError') {
      throw new AppError('Invalid token', 401);
    }
    next(err);
  }
};

export default authMiddleware;
