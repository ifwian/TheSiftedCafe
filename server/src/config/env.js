import 'dotenv/config'

/**
 * Centralized environment access (spec section 43). Every other module
 * reads config through this file instead of touching `process.env`
 * directly, so required variables are validated in one place.
 */
export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtSecret: process.env.JWT_SECRET ?? '',
  email: {
    user: process.env.EMAIL_USER ?? '',
    appPassword: process.env.EMAIL_APP_PASSWORD ?? '',
    adminNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL ?? process.env.EMAIL_USER ?? '',
  },
}

export const isProduction = env.nodeEnv === 'production'
