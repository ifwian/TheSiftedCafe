import { Router } from 'express'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { getStats } from '../controllers/admin.controller.js'
import adminMenuRoutes from './admin/menu.routes.js'
import adminReservationRoutes from './admin/reservation.routes.js'
import adminMessageRoutes from './admin/message.routes.js'
import adminReviewRoutes from './admin/review.routes.js'
import adminSettingsRoutes from './admin/settings.routes.js'

const router = Router()

// Every route below requires a valid session and the ADMIN role
// (spec section 41 and section 66).
router.use(requireAuth, requireRole('ADMIN'))

router.get('/stats', getStats)
router.use('/menu', adminMenuRoutes)
router.use('/reservations', adminReservationRoutes)
router.use('/messages', adminMessageRoutes)
router.use('/reviews', adminReviewRoutes)
router.use('/settings', adminSettingsRoutes)

export default router
