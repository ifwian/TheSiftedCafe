/**
 * LoadingState
 *
 * Reusable loading indicator (spec section 53). Used anywhere an
 * API-driven view is waiting on a response.
 */
function LoadingState({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center text-dark/60">
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-coffee/30 border-t-coffee"
        aria-hidden="true"
      />
      <p className="text-sm">{label}</p>
    </div>
  )
}

export default LoadingState
