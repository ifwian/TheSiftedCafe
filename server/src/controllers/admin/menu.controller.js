import { asyncHandler } from '../../utils/asyncHandler.js'
import {
  getAllMenuItemsAdmin,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  setMenuItemFeatured,
  setMenuItemAvailability,
} from '../../services/menu.service.js'

export const listAllMenuItems = asyncHandler(async (req, res) => {
  const items = await getAllMenuItemsAdmin()
  res.status(200).json({ success: true, data: items })
})

export const createMenuItemHandler = asyncHandler(async (req, res) => {
  const item = await createMenuItem(req.body)
  res.status(201).json({
    success: true,
    message: 'Menu item created successfully.',
    data: item,
  })
})

export const updateMenuItemHandler = asyncHandler(async (req, res) => {
  const item = await updateMenuItem(req.params.id, req.body)
  res.status(200).json({
    success: true,
    message: 'Menu item updated successfully.',
    data: item,
  })
})

export const deleteMenuItemHandler = asyncHandler(async (req, res) => {
  await deleteMenuItem(req.params.id)
  res.status(200).json({
    success: true,
    message: 'Menu item deleted successfully.',
  })
})

export const toggleFeaturedHandler = asyncHandler(async (req, res) => {
  const item = await setMenuItemFeatured(req.params.id, req.body.isFeatured)
  res.status(200).json({ success: true, data: item })
})

export const toggleAvailabilityHandler = asyncHandler(async (req, res) => {
  const item = await setMenuItemAvailability(req.params.id, req.body.isAvailable)
  res.status(200).json({ success: true, data: item })
})
