import { Router } from 'express'
import { validateBody } from '../../middleware/validate.js'
import {
  createMenuItemSchema,
  updateMenuItemSchema,
  toggleFeaturedSchema,
  toggleAvailabilitySchema,
} from '../../validators/menu.validator.js'
import {
  listAllMenuItems,
  createMenuItemHandler,
  updateMenuItemHandler,
  deleteMenuItemHandler,
  toggleFeaturedHandler,
  toggleAvailabilityHandler,
} from '../../controllers/admin/menu.controller.js'

const router = Router()

router.get('/', listAllMenuItems)
router.post('/', validateBody(createMenuItemSchema), createMenuItemHandler)
router.put('/:id', validateBody(updateMenuItemSchema), updateMenuItemHandler)
router.delete('/:id', deleteMenuItemHandler)
router.patch('/:id/featured', validateBody(toggleFeaturedSchema), toggleFeaturedHandler)
router.patch('/:id/availability', validateBody(toggleAvailabilitySchema), toggleAvailabilityHandler)

export default router
