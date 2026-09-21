import Button from '../ui/Button.jsx'

/**
 * ConfirmDialog
 *
 * Blocks a destructive action (e.g. deleting a menu item) behind an
 * explicit confirmation (spec section 73).
 */
function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = 'Delete',
  isLoading = false,
}) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-dark/40 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="w-full max-w-sm rounded-card bg-white p-6 shadow-lifted">
        <h3 id="confirm-dialog-title" className="text-lg text-dark">
          {title}
        </h3>
        <p className="mt-2 text-sm text-dark/70">{description}</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Deleting…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
