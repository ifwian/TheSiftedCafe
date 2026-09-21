/**
 * asyncHandler
 *
 * Wraps an async Express route handler so a rejected promise is forwarded
 * to the centralized error handler instead of crashing the process or
 * needing a try/catch in every controller (used heavily once the Menu,
 * Reservation, and Message controllers are built in Milestones 10-12).
 */
export function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next)
  }
}
