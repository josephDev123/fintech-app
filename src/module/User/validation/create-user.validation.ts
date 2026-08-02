import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().trim().email(),
  name: z.string().trim().min(2).max(120),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
