import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'),
  }),
});

export const getAllUsersSchema = z.object({
  query: z.object({
    page: z.string().optional().default('1'),
    limit: z.string().optional().default('10'),
    sort: z.string().optional().default('-createdAt'),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UserIdInput = z.infer<typeof userIdSchema>;
export type GetAllUsersInput = z.infer<typeof getAllUsersSchema>;
