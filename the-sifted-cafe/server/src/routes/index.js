import { Router } from 'express'
import healthRoutes from './health.routes.js'
import menuRoutes from './menu.routes.js'
import categoryRoutes from './category.routes.js'
import reservationRoutes from './reservation.routes.js'
import messageRoutes from './message.routes.js'
import reviewRoutes from './review.routes.js'
import authRoutes from './auth.routes.js'
import adminRoutes from './admin.routes.js'

/**
 * Central place every feature router gets mounted (spec section 27).
 */
const router = Router()

router.use('/health', healthRoutes)
router.use('/menu', menuRoutes)
router.use('/categories', categoryRoutes)
router.use('/reservations', reservationRoutes)
router.use('/messages', messageRoutes)
router.use('/reviews', reviewRoutes)
router.use('/auth', authRoutes)
router.use('/admin', adminRoutes)

export default router
