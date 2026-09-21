import { CloseIcon } from '../ui/icons.jsx'

/**
 * Modal
 *
 * Generic dialog shell used by the admin menu form and message viewer.
 * Closes on backdrop click; content clicks are stopped from bubbling so
 * clicking inside the dialog doesn't close it.
 */
function Modal({ open, onClose, title, children }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-dark/40 px-4 py-10"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-lg rounded-card bg-white p-6 shadow-lifted"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg text-dark">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-dark/50 hover:bg-dark/5"
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
