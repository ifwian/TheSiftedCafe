import { Router } from 'express'
import { validateBody } from '../middleware/validate.js'
import { loginLimiter } from '../middleware/rateLimit.js'
import { loginSchema } from '../validators/auth.validator.js'
import { loginHandler } from '../controllers/auth.controller.js'

const router = Router()

router.post('/login', loginLimiter, validateBody(loginSchema), loginHandler)

export default router
