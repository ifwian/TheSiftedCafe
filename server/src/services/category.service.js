import { prisma } from '../config/prisma.js'

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
  })
}

export async function getCategoryBySlug(slug) {
  return prisma.category.findUnique({ where: { slug } })
}
