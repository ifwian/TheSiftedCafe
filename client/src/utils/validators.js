/**
 * Shared client-side validators used by ReservationForm and ContactForm.
 * These provide UX feedback only -- real backend validation is added once
 * the API exists (spec section 24: "never trust frontend validation
 * alone").
 */

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function isValidPhone(value) {
  // Accepts digits, spaces, dashes, parentheses, and an optional leading +
  return /^\+?[0-9\s\-()]{7,15}$/.test(value.trim())
}

export function isFutureOrTodayDate(value) {
  if (!value) return false
  const inputDate = new Date(`${value}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return inputDate >= today
}

export function isValidGuestCount(value) {
  const guests = Number(value)
  return Number.isInteger(guests) && guests >= 1 && guests <= 20
}
