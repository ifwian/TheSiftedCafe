import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { env } from './env.js'

/**
 * Single shared PrismaClient instance (spec section 65 -- use Prisma's
 * query methods safely, and avoid opening a new connection pool every
 * time a service file is imported).
 *
 * Prisma 7 requires a driver adapter rather than reading DATABASE_URL from
 * the schema. The validated connection string comes from config/env.js so
 * a missing or malformed value fails at startup instead of on first query.
 */
const adapter = new PrismaPg({ connectionString: env.databaseUrl })

export const prisma = new PrismaClient({ adapter })