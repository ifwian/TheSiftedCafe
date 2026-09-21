import Button from '../ui/Button.jsx'

/**
 * ErrorState
 *
 * Reusable error block with an optional retry button (spec section 53
 * and section 54).
 */
function ErrorState({
  title = 'Something went wrong.',
  description,
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-red-100 bg-red-50 px-6 py-16 text-center">
      <h3 className="text-lg text-dark">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-dark/60">{description}</p>
      )}
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  )
}

export default ErrorState
