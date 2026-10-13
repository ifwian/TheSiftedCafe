import 'dotenv/config'

/**
 * Centralized environment access (spec section 43). Every other module
 * reads config through this file instead of touching `process.env`
 * directly, so required variables are validated in one place.
 *
 * Validation happens at import time, before any database connection or
 * listener is created. A misconfigured deploy should fail loudly and
 * immediately rather than crash later on the first request that happens
 * to touch the broken value.
 */

const problems = []

function required(name, hint) {
  const value = process.env[name]?.trim()
  if (!value) {
    problems.push(`Missing required environment variable ${name}. ${hint}`)
    return ''
  }
  return value
}

/**
 * `dotenv/config` never overrides a variable that is already set, so
 * platform-injected values (Vercel/Render) always win over a local `.env`.
 * That ordering is the safety property: a stray committed `.env` can never
 * take precedence over the dashboard configuration in production.
 */

const nodeEnv = process.env.NODE_ENV?.trim() || 'development'

// PORT is injected automatically by Vercel and Render. Fall back to 5000
// only for local development.
const rawPort = process.env.PORT?.trim()
let port = 5000
if (rawPort) {
  port = Number(rawPort)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    problems.push(
      `Invalid PORT "${rawPort}". It must be an integer between 1 and 65535.`,
    )
  }
}

// PostgreSQL connection string. Prisma reads the raw DATABASE_URL itself,
// so this copy exists to validate it and to fail fast on a blank value.
const databaseUrl = required(
  'DATABASE_URL',
  'Set it to a PostgreSQL connection string, e.g. postgresql://user:pass@host:5432/the_sifted_cafe?sslmode=require',
)
if (databaseUrl && !databaseUrl.startsWith('postgres')) {
  problems.push(
    'DATABASE_URL does not look like a PostgreSQL connection string (expected it to start with postgresql://).',
  )
}

const jwtSecret = required(
  'JWT_SECRET',
  'Set it to a long random string, e.g. node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"',
)
if (jwtSecret && jwtSecret.length < 32) {
  problems.push(
    `JWT_SECRET is only ${jwtSecret.length} characters long. Use at least 32 characters of random data.`,
  )
}

if (problems.length > 0) {
  console.error(
    '\n[config] The Sifted Cafe API cannot start because its environment is incomplete or invalid:\n',
  )
  for (const problem of problems) {
    console.error(`  - ${problem}`)
  }
  console.error(
    '\nCopy server/.env.example to server/.env for local development, or set the\n' +
      'variables in the Vercel project dashboard for deployments.\n',
  )
  // Fail fast: a half-configured API should never reach the point of
  // accepting traffic it cannot securely handle.
  process.exit(1)
}

/**
 * Comma-separated allowlist of browser origins permitted to call the API,
 * used by config/cors.js. Kept as a parsed array here so the CORS layer
 * never has to re-parse a raw string on every request.
 */
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

/**
 * Origins that must be accepted in every environment: the frontend dev
 * server, plus the deployed Vercel domain.
 *
 * CLIENT_URL stays supported because it predates ALLOWED_ORIGINS and is
 * already set in existing deployments.
 */
const configuredOrigins = [
  ...new Set(
    [process.env.CLIENT_URL?.trim(), ...allowedOrigins].filter(Boolean),
  ),
]

/**
 * The deployment's own origin, derived from the live request. Accepting
 * same-origin requests is what lets the Vercel rewrite send `/api/*` and
 * the SPA through one domain without any extra configuration.
 */
function isSameOrigin(req) {
  const origin = req.headers.origin
  if (!origin) return true // non-browser client (curl, server-to-server)

  let originHost
  try {
    originHost = new URL(origin).host
  } catch {
    return false // malformed Origin header
  }

  // Behind a rewrite proxy (Vercel's multi-service routing sends /api/* to
  // this service with its own internal hostname) the public host can show
  // up as one of several comma-separated forwarded values, so compare
  // against all of them rather than assuming a single `host`.
  const candidates = new Set(
    [
      ...String(req.headers['x-forwarded-host'] ?? '').split(','),
      req.headers.host,
    ]
      .map((value) => value?.trim())
      .filter(Boolean),
  )

  // Host-only match ignores scheme/port normalization differences, which
  // is what matters here -- this function exists to recognise our own
  // frontend, not to police transport security.
  return candidates.has(originHost)
}

export const isProduction = nodeEnv === 'production'

export const env = {
  nodeEnv,
  port,
  databaseUrl,
  jwtSecret,
  clientUrl: process.env.CLIENT_URL?.trim() || 'http://localhost:5173',
  allowedOrigins: configuredOrigins,
  isSameOrigin,
  email: {
    user: process.env.EMAIL_USER?.trim() ?? '',
    appPassword: process.env.EMAIL_APP_PASSWORD?.trim() ?? '',
    adminNotificationEmail:
      process.env.ADMIN_NOTIFICATION_EMAIL?.trim() ??
      process.env.EMAIL_USER?.trim() ??
      '',
  },
}