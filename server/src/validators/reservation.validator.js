import { z } from 'zod'

/**
 * Mirrors the frontend's validators (client/src/utils/validators.js) but
 * is the actual source of truth -- the frontend's checks are UX only
 * (spec section 24).
 */
export const createReservationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required.')
    .max(120, 'Name is too long.'),
  email: z.string().trim().toLowerCase().email('A valid email is required.'),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{7,15}$/, 'A valid phone number is required.'),
  date: z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), 'A valid date is required.')
    .refine((value) => {
      const inputDate = new Date(`${value}T00:00:00`)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return inputDate >= today
    }, 'Date must be today or in the future.'),
  time: z.string().trim().min(1, 'Time is required.'),
  guests: z.coerce
    .number()
    .int('Guests must be a whole number.')
    .min(1, 'At least 1 guest is required.')
    .max(20, 'Guest count cannot exceed 20.'),
  specialRequest: z.string().trim().max(500).optional().or(z.literal('')),
  // Honeypot field: real users never see or fill this (see FormField
  // usage in ReservationForm.jsx). A non-empty value here means the
  // submission came from a bot, not client input to actually validate.
  honeypot: z.string().optional().default(''),
})

export const updateReservationStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
})
