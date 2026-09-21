import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

/**
 * GET /api/health
 *
 * Simple liveness check -- confirms the API is up and reachable. Useful
 * for local development and for the hosting platform's health checks
 * once deployed (Milestone 21).
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
      },
    })
  }),
)

export default router
