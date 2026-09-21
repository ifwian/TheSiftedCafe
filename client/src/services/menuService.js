import { api } from './api.js'

/**
 * The API returns `category` as a nested object ({ name, slug, ... }) and
 * the image field as `imageUrl`. Existing components (MenuCard, MenuItem,
 * FeaturedMenuSection) were built against the flatter mock-data shape
 * (`category` as a string name, `image` as the URL) -- normalizing here
 * keeps every one of those components unchanged.
 */
function normalizeMenuItem(item) {
  return {
    ...item,
    image: item.imageUrl ?? item.image,
    category: item.category?.name ?? item.category,
    categorySlug: item.category?.slug ?? item.categorySlug,
  }
}

export async function getMenuItems() {
  const response = await api.get('/menu')
  return response.data.map(normalizeMenuItem)
}

export async function getFeaturedMenuItems() {
  const response = await api.get('/menu/featured')
  return response.data.map(normalizeMenuItem)
}

export async function getMenuItemsByCategory(categorySlug) {
  if (!categorySlug) return []
  const response = await api.get(`/menu/category/${categorySlug}`)
  return response.data.map(normalizeMenuItem)
}

export async function getMenuItemById(id) {
  const response = await api.get(`/menu/${id}`)
  return normalizeMenuItem(response.data)
}
