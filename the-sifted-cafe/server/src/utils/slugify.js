/**
 * Converts a name like "Spanish Latte!" into "spanish-latte".
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
