import rateLimit from 'express-rate-limit'

/**
 * generalLimiter
 *
 * Applied to the whole API (spec section 64 -- rate limiting where
 * appropriate). Generous enough not to bother normal browsing.
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
})

/**
 * loginLimiter
 *
 * Much stricter, applied only to POST /api/auth/login, to slow down
 * brute-force password guessing (spec section 64).
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.',
  },
})
