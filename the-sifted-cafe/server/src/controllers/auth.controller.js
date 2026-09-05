import { asyncHandler } from '../utils/asyncHandler.js'
import { login } from '../services/auth.service.js'

/**
 * POST /api/auth/login
 */
export const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const result = await login(email, password)

  res.status(200).json({ success: true, data: result })
})
