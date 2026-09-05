import { ApiError } from './errorHandler.js'

/**
 * validateBody
 *
 * Generic middleware factory: takes a Zod schema, validates req.body
 * against it, and replaces req.body with the parsed (and coerced) result.
 * Never trust frontend validation alone (spec section 24) -- this is the
 * real gate every request has to pass before reaching a controller.
 */
export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const firstIssue = result.error.issues[0]
      const message = firstIssue
        ? `${firstIssue.path.join('.')}: ${firstIssue.message}`
        : 'Invalid request body.'
      throw new ApiError(422, message)
    }

    req.body = result.data
    next()
  }
}
