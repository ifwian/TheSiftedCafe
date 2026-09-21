/**
 * FormField
 *
 * Labeled wrapper around a single form control, with an inline error
 * message slot (spec section 55 — labels, validation, helpful errors).
 */
function FormField({ label, id, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-dark">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

export default FormField
