import { prisma } from '../config/prisma.js'
import { ApiError } from '../middleware/errorHandler.js'
import { notifyMessageCreated } from './email.service.js'

/**
 * createMessage
 *
 * Always saved with status UNREAD (spec section 25) -- an admin reads and
 * archives it once the admin dashboard's Message Management exists
 * (Milestone 16). Email notification is fire-and-forget (see
 * email.service.js).
 */
export async function createMessage({ name, email, subject, message }) {
  const created = await prisma.message.create({
    data: { name, email, subject, message, status: 'UNREAD' },
  })

  notifyMessageCreated(created).catch((error) =>
    console.error('Message email notification failed:', error),
  )

  return created
}

/**
 * Admin-only functions below (spec section 48).
 */
export async function getAllMessages() {
  return prisma.message.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function updateMessageStatus(id, status) {
  try {
    return await prisma.message.update({ where: { id }, data: { status } })
  } catch (error) {
    if (error.code === 'P2025') throw new ApiError(404, 'Message not found')
    throw error
  }
}
