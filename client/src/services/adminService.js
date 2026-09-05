import { api } from './api.js'

export async function getDashboardStats() {
  const response = await api.get('/admin/stats')
  return response.data
}

/**
 * Admin Menu Management (spec section 46)
 */
function normalizeMenuItem(item) {
  return {
    ...item,
    image: item.imageUrl ?? item.image,
    categoryName: item.category?.name,
  }
}

export async function getAllMenuItemsAdmin() {
  const response = await api.get('/admin/menu')
  return response.data.map(normalizeMenuItem)
}

export async function createMenuItemAdmin(payload) {
  const response = await api.post('/admin/menu', payload)
  return normalizeMenuItem(response.data)
}

export async function updateMenuItemAdmin(id, payload) {
  const response = await api.put(`/admin/menu/${id}`, payload)
  return normalizeMenuItem(response.data)
}

export async function deleteMenuItemAdmin(id) {
  await api.delete(`/admin/menu/${id}`)
}

export async function toggleMenuItemFeatured(id, isFeatured) {
  const response = await api.patch(`/admin/menu/${id}/featured`, { isFeatured })
  return normalizeMenuItem(response.data)
}

export async function toggleMenuItemAvailability(id, isAvailable) {
  const response = await api.patch(`/admin/menu/${id}/availability`, { isAvailable })
  return normalizeMenuItem(response.data)
}

/**
 * Admin Reservation Management (spec section 47)
 */
export async function getAllReservationsAdmin() {
  const response = await api.get('/admin/reservations')
  return response.data
}

export async function updateReservationStatusAdmin(id, status) {
  const response = await api.patch(`/admin/reservations/${id}`, { status })
  return response.data
}

/**
 * Admin Message Management (spec section 48)
 */
export async function getAllMessagesAdmin() {
  const response = await api.get('/admin/messages')
  return response.data
}

export async function updateMessageStatusAdmin(id, status) {
  const response = await api.patch(`/admin/messages/${id}`, { status })
  return response.data
}

/**
 * Admin Review Management (spec section 37)
 */
export async function getAllReviewsAdmin() {
  const response = await api.get('/admin/reviews')
  return response.data
}

export async function createReviewAdmin(payload) {
  const response = await api.post('/admin/reviews', payload)
  return response.data
}

export async function updateReviewAdmin(id, payload) {
  const response = await api.put(`/admin/reviews/${id}`, payload)
  return response.data
}

export async function deleteReviewAdmin(id) {
  await api.delete(`/admin/reviews/${id}`)
}

export async function toggleReviewPublished(id, isPublished) {
  const response = await api.patch(`/admin/reviews/${id}/published`, { isPublished })
  return response.data
}

/**
 * Admin Settings -- change password
 */
export async function changePasswordAdmin(currentPassword, newPassword) {
  const response = await api.patch('/admin/settings/password', {
    currentPassword,
    newPassword,
  })
  return response
}
