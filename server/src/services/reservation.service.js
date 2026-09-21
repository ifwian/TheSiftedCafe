import { prisma } from '../config/prisma.js'
import { ApiError } from '../middleware/errorHandler.js'
import { notifyReservationCreated } from './email.service.js'

/**
 * createReservation
 *
 * Always saved with status PENDING (spec section 23) -- an admin reviews
 * and updates the status once the admin dashboard exists (Milestone 16).
 * Email notifications are fire-and-forget: if they fail, the reservation
 * itself is still saved successfully (see email.service.js).
 */
export async function createReservation({
  name,
  email,
  phone,
  date,
  time,
  guests,
  specialRequest,
}) {
  const reservation = await prisma.reservation.create({
    data: {
      customerName: name,
      email,
      phone,
      date: new Date(`${date}T00:00:00`),
      time,
      guests,
      specialRequest: specialRequest || null,
      status: 'PENDING',
    },
  })

  notifyReservationCreated(reservation).catch((error) =>
    console.error('Reservation email notification failed:', error),
  )

  return reservation
}

/**
 * Admin-only functions below (spec section 47).
 */
export async function getAllReservations() {
  return prisma.reservation.findMany({ orderBy: { date: 'asc' } })
}

export async function updateReservationStatus(id, status) {
  try {
    return await prisma.reservation.update({ where: { id }, data: { status } })
  } catch (error) {
    if (error.code === 'P2025') throw new ApiError(404, 'Reservation not found')
    throw error
  }
}
