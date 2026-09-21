import { asyncHandler } from '../utils/asyncHandler.js'
import { getCategories } from '../services/category.service.js'

/**
 * GET /api/categories
 */
export const listCategories = asyncHandler(async (req, res) => {
  const categories = await getCategories()
  res.status(200).json({ success: true, data: categories })
})
