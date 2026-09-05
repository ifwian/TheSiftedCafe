import { Router } from 'express'
import { validateBody } from '../middleware/validate.js'
import { createMessageSchema } from '../validators/message.validator.js'
import { submitMessage } from '../controllers/message.controller.js'

const router = Router()

router.post('/', validateBody(createMessageSchema), submitMessage)

export default router
