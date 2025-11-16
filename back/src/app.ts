import express, { Express } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';

import { morganMiddleware } from '#src/middlewares/logger.js';
import { AppError, errorHandler } from '#src/middlewares/error-handler.js';
import healthcheckRoutes from '#src/modules/healthcheck/healthcheck.route.js';
import userRoutes from '#src/modules/user/user.route.js';
import authRoutes from '#src/modules/auth/auth.route.js';
import userAdminRoutes from '#src/modules/user/admin/admin.route.js';
import { successHandler } from './middlewares/success-handler.js';

export const createApp = (): Express => {
  const app = express();

  app.use(helmet());
  app.use(hpp());

  app.use(
    cors({
      // origin: ENV.CORS_ORIGIN,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(compression());
  app.use(morganMiddleware);
  app.use(successHandler);

  app.get('/', (_req, res) => res.success('server started successfully'));

  app.use('/api', healthcheckRoutes);
  app.use('/api/v1/admin', userAdminRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/auth', authRoutes);

  app.use((_req, _res, next) => {
    next(new AppError('Route not found', 404));
  });

  app.use(errorHandler);

  return app;
};
