import { Router } from 'express'
import { validateBody } from '../middleware/validate.js'
import { createReservationSchema } from '../validators/reservation.validator.js'
import { submitReservation } from '../controllers/reservation.controller.js'

const router = Router()

router.post('/', validateBody(createReservationSchema), submitReservation)

export default router
