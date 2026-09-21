/**
 * Shared input styling for every text/select/textarea field across the
 * Reservation and Contact forms (spec section 109 — Design Consistency).
 */
export function inputClasses(hasError) {
  return `w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-dark placeholder:text-dark/40 transition-colors focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
      : 'border-dark/15 focus:border-coffee/50 focus:ring-coffee/20'
  }`
}
