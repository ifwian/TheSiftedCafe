import { asyncHandler } from '../utils/asyncHandler.js'
import { getPublishedReviews } from '../services/review.service.js'

/**
 * GET /api/reviews
 */
export const listPublishedReviews = asyncHandler(async (req, res) => {
  const reviews = await getPublishedReviews()
  res.status(200).json({ success: true, data: reviews })
})
