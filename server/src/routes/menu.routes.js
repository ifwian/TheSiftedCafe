import { Router } from 'express'
import {
  listMenuItems,
  listFeaturedMenuItems,
  listMenuItemsByCategory,
  getMenuItem,
} from '../controllers/menu.controller.js'

const router = Router()

// Order matters: specific paths (/featured, /category/:slug) must be
// registered before the generic /:id, or Express would try to match
// "featured" as an :id value.
router.get('/', listMenuItems)
router.get('/featured', listFeaturedMenuItems)
router.get('/category/:categorySlug', listMenuItemsByCategory)
router.get('/:id', getMenuItem)

export default router
