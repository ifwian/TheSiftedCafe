import { z } from 'zod'

export const createReviewSchema = z.object({
  customerName: z.string().trim().min(1, 'Customer name is required.').max(120),
  rating: z.coerce.number().int().min(1, 'Rating must be at least 1.').max(5, 'Rating cannot exceed 5.'),
  comment: z.string().trim().min(1, 'Comment is required.').max(1000, 'Comment is too long.'),
  isPublished: z.coerce.boolean().optional().default(false),
})

export const updateReviewSchema = createReviewSchema.partial()

export const togglePublishedSchema = z.object({
  isPublished: z.coerce.boolean(),
})
