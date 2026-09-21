import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../middleware/errorHandler.js'
import {
  getMenuItems,
  getFeaturedMenuItems,
  getMenuItemsByCategorySlug,
  getMenuItemById,
} from '../services/menu.service.js'

/**
 * GET /api/menu
 * Optional query params: ?category=<slug>&search=<term>
 */
export const listMenuItems = asyncHandler(async (req, res) => {
  const { category, search } = req.query
  const items = await getMenuItems({ category, search })

  res.status(200).json({ success: true, data: items })
})

/**
 * GET /api/menu/featured
 */
export const listFeaturedMenuItems = asyncHandler(async (req, res) => {
  const items = await getFeaturedMenuItems()
  res.status(200).json({ success: true, data: items })
})

/**
 * GET /api/menu/category/:categorySlug
 */
export const listMenuItemsByCategory = asyncHandler(async (req, res) => {
  const items = await getMenuItemsByCategorySlug(req.params.categorySlug)
  res.status(200).json({ success: true, data: items })
})

/**
 * GET /api/menu/:id
 */
export const getMenuItem = asyncHandler(async (req, res) => {
  const item = await getMenuItemById(req.params.id)

  if (!item) {
    throw new ApiError(404, 'Menu item not found')
  }

  res.status(200).json({ success: true, data: item })
})
