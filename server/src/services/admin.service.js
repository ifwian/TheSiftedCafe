import { prisma } from '../config/prisma.js'

/**
 * getDashboardStats
 *
 * Real counts from the database (spec section 45 -- "do not create
 * meaningless fake analytics").
 */
export async function getDashboardStats() {
  const [
    totalMenuItems,
    availableItems,
    featuredItems,
    pendingReservations,
    confirmedReservations,
    unreadMessages,
  ] = await Promise.all([
    prisma.menuItem.count(),
    prisma.menuItem.count({ where: { isAvailable: true } }),
    prisma.menuItem.count({ where: { isFeatured: true } }),
    prisma.reservation.count({ where: { status: 'PENDING' } }),
    prisma.reservation.count({ where: { status: 'CONFIRMED' } }),
    prisma.message.count({ where: { status: 'UNREAD' } }),
  ])

  return {
    totalMenuItems,
    availableItems,
    featuredItems,
    pendingReservations,
    confirmedReservations,
    unreadMessages,
  }
}
