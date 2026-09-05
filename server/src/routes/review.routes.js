import { Router } from 'express'
import { listPublishedReviews } from '../controllers/review.controller.js'

const router = Router()

router.get('/', listPublishedReviews)

export default router
