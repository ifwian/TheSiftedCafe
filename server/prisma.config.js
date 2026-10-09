import 'dotenv/config'
import { defineConfig } from 'prisma/config'

/**
 * Prisma CLI configuration.
 *
 * Prisma 7 moved the connection string out of schema.prisma and into this
 * file. `process.env.DATABASE_URL` is read directly rather than through
 * prisma/config's `env()` helper on purpose: `env()` throws when the
 * variable is missing, which would break `prisma generate` during a Vercel
 * build (it runs before runtime secrets are necessarily available and
 * needs no database access at all).
 */
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'node prisma/seed.js',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
})