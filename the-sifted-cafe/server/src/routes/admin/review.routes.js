import { Router } from 'express'
import { validateBody } from '../../middleware/validate.js'
import {
  createReviewSchema,
  updateReviewSchema,
  togglePublishedSchema,
} from '../../validators/review.validator.js'
import {
  listAllReviews,
  createReviewHandler,
  updateReviewHandler,
  deleteReviewHandler,
  togglePublishedHandler,
} from '../../controllers/admin/review.controller.js'

const router = Router()

router.get('/', listAllReviews)
router.post('/', validateBody(createReviewSchema), createReviewHandler)
router.put('/:id', validateBody(updateReviewSchema), updateReviewHandler)
router.delete('/:id', deleteReviewHandler)
router.patch('/:id/published', validateBody(togglePublishedSchema), togglePublishedHandler)

export default router
