import { asyncHandler } from '../../utils/asyncHandler.js'
import {
  getAllReviewsAdmin,
  createReview,
  updateReview,
  deleteReview,
  setReviewPublished,
} from '../../services/review.service.js'

export const listAllReviews = asyncHandler(async (req, res) => {
  const reviews = await getAllReviewsAdmin()
  res.status(200).json({ success: true, data: reviews })
})

export const createReviewHandler = asyncHandler(async (req, res) => {
  const review = await createReview(req.body)
  res.status(201).json({
    success: true,
    message: 'Review created successfully.',
    data: review,
  })
})

export const updateReviewHandler = asyncHandler(async (req, res) => {
  const review = await updateReview(req.params.id, req.body)
  res.status(200).json({
    success: true,
    message: 'Review updated successfully.',
    data: review,
  })
})

export const deleteReviewHandler = asyncHandler(async (req, res) => {
  await deleteReview(req.params.id)
  res.status(200).json({
    success: true,
    message: 'Review deleted successfully.',
  })
})

export const togglePublishedHandler = asyncHandler(async (req, res) => {
  const review = await setReviewPublished(req.params.id, req.body.isPublished)
  res.status(200).json({ success: true, data: review })
})
