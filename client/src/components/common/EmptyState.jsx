/**
 * EmptyState
 *
 * Reusable "nothing here" block (spec section 71 and section 95). Used by
 * the Menu grid now; reused by Gallery, Reservations, and Messages lists
 * later.
 */
function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-dark/15 px-6 py-16 text-center">
      <h3 className="text-lg text-dark">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-dark/60">{description}</p>
      )}
      {action}
    </div>
  )
}

export default EmptyState
