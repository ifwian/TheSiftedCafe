import { prisma } from '../config/prisma.js'
import { ApiError } from '../middleware/errorHandler.js'

/**
 * Public: only published reviews, newest first (spec section 21 --
 * testimonials shown on the homepage).
 */
export async function getPublishedReviews() {
  return prisma.review.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
  })
}

/**
 * Admin-only functions below (spec section 37 -- "Admin should control
 * publication").
 */
export async function getAllReviewsAdmin() {
  return prisma.review.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createReview(data) {
  return prisma.review.create({ data })
}

export async function updateReview(id, data) {
  try {
    return await prisma.review.update({ where: { id }, data })
  } catch (error) {
    if (error.code === 'P2025') throw new ApiError(404, 'Review not found')
    throw error
  }
}

export async function deleteReview(id) {
  try {
    await prisma.review.delete({ where: { id } })
  } catch (error) {
    if (error.code === 'P2025') throw new ApiError(404, 'Review not found')
    throw error
  }
}

export async function setReviewPublished(id, isPublished) {
  try {
    return await prisma.review.update({ where: { id }, data: { isPublished } })
  } catch (error) {
    if (error.code === 'P2025') throw new ApiError(404, 'Review not found')
    throw error
  }
}
