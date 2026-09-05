import { Router } from 'express'
import { validateBody } from '../../middleware/validate.js'
import { changePasswordSchema } from '../../validators/auth.validator.js'
import { changePasswordHandler } from '../../controllers/admin/settings.controller.js'

const router = Router()

router.patch('/password', validateBody(changePasswordSchema), changePasswordHandler)

export default router
