import { isProduction } from '../config/env.js'

/**
 * ApiError
 *
 * Thrown by controllers/services for expected, "known" failures (bad
 * input, missing resource, unauthorized, etc.) so errorHandler can map
 * them to the right HTTP status instead of a generic 500.
 */
export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

/**
 * notFound
 *
 * Catches any request that didn't match a route and forwards a 404 into
 * the centralized error handler below, keeping the response shape
 * consistent (spec section 30).
 */
export function notFound(req, res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}

/**
 * errorHandler
 *
 * Single place all errors flow through (spec section 54 — centralized
 * error handling middleware). Never leaks stack traces in production
 * (spec section 54).
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode ?? 500
  const message = err.statusCode ? err.message : 'Something went wrong on our end.'

  if (!err.statusCode) {
    console.error(err)
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(isProduction ? {} : { stack: err.stack }),
  })
}
