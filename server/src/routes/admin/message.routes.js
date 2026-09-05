import { Router } from 'express'
import { validateBody } from '../../middleware/validate.js'
import { updateMessageStatusSchema } from '../../validators/message.validator.js'
import {
  listAllMessages,
  updateMessageStatusHandler,
} from '../../controllers/admin/message.controller.js'

const router = Router()

router.get('/', listAllMessages)
router.patch(
  '/:id',
  validateBody(updateMessageStatusSchema),
  updateMessageStatusHandler,
)

export default router
