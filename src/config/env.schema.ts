import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  //   JWT_SECRET: z.string().min(32),

  PORT: z.coerce.number().default(5000),
});

export type Env = z.infer<typeof envSchema>;
