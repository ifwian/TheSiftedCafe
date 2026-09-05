import { Router } from 'express'
import { validateBody } from '../../middleware/validate.js'
import { updateReservationStatusSchema } from '../../validators/reservation.validator.js'
import {
  listAllReservations,
  updateReservationStatusHandler,
} from '../../controllers/admin/reservation.controller.js'

const router = Router()

router.get('/', listAllReservations)
router.patch(
  '/:id',
  validateBody(updateReservationStatusSchema),
  updateReservationStatusHandler,
)

export default router
