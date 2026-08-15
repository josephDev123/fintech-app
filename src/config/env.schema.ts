import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_TTL: z.string().regex(/^\d+[smhd]$/),
  JWT_REFRESH_TTL: z.string().regex(/^\d+[smhd]$/),
  PORT: z.coerce.number().default(5000),
});

export type Env = z.infer<typeof envSchema>;
