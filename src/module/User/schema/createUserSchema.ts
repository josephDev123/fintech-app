import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.email(),
  name: z.string().trim().min(2).max(120),
  password: z.string().min(8).max(128),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
