import { useCallback, useRef, useState } from 'react'
import { ToastContext } from './toastContext.js'

/**
 * ToastProvider
 *
 * Lightweight success/error/warning notifications (spec section 72),
 * used by the admin CRUD actions -- "Menu item created successfully.",
 * "Reservation confirmed.", etc. Auto-dismisses after a few seconds.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const nextId = useRef(0)

  const showToast = useCallback((message, type = 'success') => {
    const id = nextId.current++
    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3500)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto rounded-lg px-4 py-3 text-sm text-white shadow-lifted ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-dark'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
