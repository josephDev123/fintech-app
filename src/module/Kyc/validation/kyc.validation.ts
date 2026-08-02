import { z } from 'zod';

export const submitKycSchema = z.object({}).passthrough();

export const reviewKycSchema = z.object({
  status: z.enum(['VERIFIED', 'FAILED']),
  reviewNote: z.string().trim().min(2).max(500).optional(),
});

export type SubmitKycInput = z.infer<typeof submitKycSchema>;
export type ReviewKycInput = z.infer<typeof reviewKycSchema>;
