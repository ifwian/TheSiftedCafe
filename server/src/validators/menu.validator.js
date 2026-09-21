import { z } from 'zod'

export const createMenuItemSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(120, 'Name is too long.'),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required.')
    .max(500, 'Description is too long.'),
  price: z.coerce.number().positive('Price must be greater than 0.'),
  categoryId: z.string().trim().min(1, 'Category is required.'),
  imageUrl: z.string().trim().url('A valid image URL is required.'),
  isFeatured: z.coerce.boolean().optional().default(false),
  isAvailable: z.coerce.boolean().optional().default(true),
})

// Every field optional for partial edits, but still validated when present.
export const updateMenuItemSchema = createMenuItemSchema.partial()

export const toggleFeaturedSchema = z.object({
  isFeatured: z.coerce.boolean(),
})

export const toggleAvailabilitySchema = z.object({
  isAvailable: z.coerce.boolean(),
})
