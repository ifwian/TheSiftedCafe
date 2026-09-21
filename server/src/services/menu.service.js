import { prisma } from '../config/prisma.js'
import { slugify } from '../utils/slugify.js'
import { ApiError } from '../middleware/errorHandler.js'

/**
 * Converts Prisma's Decimal price field to a plain number before it's
 * sent as JSON (see the comment on `price` in schema.prisma).
 */
function serializeMenuItem(item) {
  return { ...item, price: Number(item.price) }
}

/**
 * Returns menu items, optionally filtered by category slug and/or a
 * search term matching name/description/category (spec section 19).
 */
export async function getMenuItems({ category, search } = {}) {
  const items = await prisma.menuItem.findMany({
    where: {
      ...(category && {
        category: { slug: category },
      }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { category: { name: { contains: search, mode: 'insensitive' } } },
        ],
      }),
    },
    include: { category: true },
    orderBy: { name: 'asc' },
  })

  return items.map(serializeMenuItem)
}

export async function getFeaturedMenuItems() {
  const items = await prisma.menuItem.findMany({
    where: { isFeatured: true },
    include: { category: true },
    orderBy: { name: 'asc' },
  })

  return items.map(serializeMenuItem)
}

export async function getMenuItemsByCategorySlug(categorySlug) {
  const items = await prisma.menuItem.findMany({
    where: { category: { slug: categorySlug } },
    include: { category: true },
    orderBy: { name: 'asc' },
  })

  return items.map(serializeMenuItem)
}

export async function getMenuItemById(id) {
  const item = await prisma.menuItem.findUnique({
    where: { id },
    include: { category: true },
  })

  return item ? serializeMenuItem(item) : null
}

/**
 * Admin-only functions below (spec section 46). Unlike the public
 * getMenuItems(), this includes unavailable items so admins can manage
 * them.
 */
export async function getAllMenuItemsAdmin() {
  const items = await prisma.menuItem.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })

  return items.map(serializeMenuItem)
}

async function generateUniqueSlug(name) {
  const baseSlug = slugify(name)
  let slug = baseSlug
  let suffix = 1

  // eslint-disable-next-line no-await-in-loop
  while (await prisma.menuItem.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`
    suffix += 1
  }

  return slug
}

export async function createMenuItem(data) {
  const slug = await generateUniqueSlug(data.name)

  const item = await prisma.menuItem.create({
    data: { ...data, slug },
    include: { category: true },
  })

  return serializeMenuItem(item)
}

export async function updateMenuItem(id, data) {
  try {
    const item = await prisma.menuItem.update({
      where: { id },
      data,
      include: { category: true },
    })
    return serializeMenuItem(item)
  } catch (error) {
    if (error.code === 'P2025') throw new ApiError(404, 'Menu item not found')
    throw error
  }
}

export async function deleteMenuItem(id) {
  try {
    await prisma.menuItem.delete({ where: { id } })
  } catch (error) {
    if (error.code === 'P2025') throw new ApiError(404, 'Menu item not found')
    throw error
  }
}

export async function setMenuItemFeatured(id, isFeatured) {
  try {
    const item = await prisma.menuItem.update({
      where: { id },
      data: { isFeatured },
      include: { category: true },
    })
    return serializeMenuItem(item)
  } catch (error) {
    if (error.code === 'P2025') throw new ApiError(404, 'Menu item not found')
    throw error
  }
}

export async function setMenuItemAvailability(id, isAvailable) {
  try {
    const item = await prisma.menuItem.update({
      where: { id },
      data: { isAvailable },
      include: { category: true },
    })
    return serializeMenuItem(item)
  } catch (error) {
    if (error.code === 'P2025') throw new ApiError(404, 'Menu item not found')
    throw error
  }
}
