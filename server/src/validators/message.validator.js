import { z } from 'zod'

export const createMessageSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(120, 'Name is too long.'),
  email: z.string().trim().toLowerCase().email('A valid email is required.'),
  subject: z
    .string()
    .trim()
    .min(1, 'Subject is required.')
    .max(150, 'Subject is too long.'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message is too long.'),
  // Honeypot field: real users never see or fill this. A non-empty value
  // means the submission came from a bot.
  honeypot: z.string().optional().default(''),
})

export const updateMessageStatusSchema = z.object({
  status: z.enum(['UNREAD', 'READ', 'ARCHIVED']),
})
