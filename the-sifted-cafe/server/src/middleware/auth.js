import { verifyToken } from '../utils/jwt.js'
import { ApiError } from './errorHandler.js'

/**
 * requireAuth
 *
 * "Who are you?" (spec section 41). Reads the Bearer token, verifies it,
 * and attaches the decoded { userId, role } to req.user for downstream
 * handlers/middleware.
 */
export function requireAuth(req, res, next) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    throw new ApiError(401, 'Authentication required.')
  }

  try {
    req.user = verifyToken(token)
    next()
  } catch {
    throw new ApiError(401, 'Invalid or expired session. Please log in again.')
  }
}

/**
 * requireRole
 *
 * "Are you allowed to do this?" (spec section 41). Must run after
 * requireAuth, since it reads req.user.
 */
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, 'You do not have permission to do that.')
    }
    next()
  }
}
