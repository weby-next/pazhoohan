import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Response {
    success: (data?: unknown, message?: string, statusCode?: number) => Response;
  }
}
