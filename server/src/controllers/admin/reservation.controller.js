import { asyncHandler } from '../../utils/asyncHandler.js'
import {
  getAllReservations,
  updateReservationStatus,
} from '../../services/reservation.service.js'

export const listAllReservations = asyncHandler(async (req, res) => {
  const reservations = await getAllReservations()
  res.status(200).json({ success: true, data: reservations })
})

export const updateReservationStatusHandler = asyncHandler(async (req, res) => {
  const reservation = await updateReservationStatus(req.params.id, req.body.status)
  res.status(200).json({
    success: true,
    message: 'Reservation updated.',
    data: reservation,
  })
})
