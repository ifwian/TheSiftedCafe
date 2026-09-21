import { PrismaClient } from '@prisma/client'

/**
 * Single shared PrismaClient instance (spec section 65 -- use Prisma's
 * query methods safely, and avoid opening a new connection pool every
 * time a service file is imported).
 */
export const prisma = new PrismaClient()
