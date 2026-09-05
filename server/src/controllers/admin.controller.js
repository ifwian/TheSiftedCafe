import { asyncHandler } from '../utils/asyncHandler.js'
import { getDashboardStats } from '../services/admin.service.js'

/**
 * GET /api/admin/stats
 */
export const getStats = asyncHandler(async (req, res) => {
  const stats = await getDashboardStats()
  res.status(200).json({ success: true, data: stats })
})
