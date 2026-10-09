import { env, isProduction } from './env.js'

/**
 * CORS policy for the API.
 *
 * In production the API is served from the same origin as the React client
 * (Vercel routes `/api/*` to this service via a rewrite), so the only
 * browser origin that needs to be accepted is the deployment's own. That
 * is derived per-request from the forwarded host rather than hardcoded,
 * which keeps production, preview, and custom domains working without a
 * redeploy.
 *
 * Additional origins are opt-in through ALLOWED_ORIGINS/CLIENT_URL for
 * the cases where the client genuinely is on another host.
 */
function resolveOrigin(origin, req) {
  // Server-to-server and non-browser callers (curl, health checks) send
  // no Origin header. They are not subject to browser CORS policy, and
  // authorization is still enforced per-route by the auth middleware.
  if (!origin) return true

  if (isProduction) {
    return env.isSameOrigin(req) || env.allowedOrigins.includes(origin)
  }

  // Development: allow the Vite dev server, plus anything explicitly
  // listed. Never reflect an arbitrary Origin, or any other site could
  // read authenticated API responses from a developer's browser.
  return (
    env.allowedOrigins.includes(origin) ||
    origin === env.clientUrl ||
    /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
    /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)
  )
}

export function corsOptionsDelegate(req, callback) {
  const origin = req.headers.origin
  if (resolveOrigin(origin, req)) {
    callback(null, { origin: true, credentials: true })
    return
  }
  // Passing an Error makes the `cors` middleware reject the request before
  // it reaches any handler, so no route can accidentally respond with a
  // wildcard ACAO header.
  callback(new Error('Origin not allowed by CORS policy'))
}