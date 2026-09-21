import { asyncHandler } from '../utils/asyncHandler.js'
import { createReservation } from '../services/reservation.service.js'

/**
 * POST /api/reservations
 *
 * Public endpoint -- req.body has already passed validateBody
 * (createReservationSchema) by the time it reaches here.
 */
export const submitReservation = asyncHandler(async (req, res) => {
  // Honeypot tripped: pretend success without touching the database or
  // sending email, so the bot has no signal that it was caught.
  if (req.body.honeypot) {
    return res.status(201).json({
      success: true,
      message: 'Reservation request received. We will confirm it shortly.',
    })
  }

  const reservation = await createReservation(req.body)

  res.status(201).json({
    success: true,
    message: 'Reservation request received. We will confirm it shortly.',
    data: reservation,
  })
})
