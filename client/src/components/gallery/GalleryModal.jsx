import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '../ui/icons.jsx'

/**
 * GalleryModal
 *
 * Lightbox for the Gallery grid (spec section 20): opens the selected
 * image full-size, supports next/previous, closes on Escape or backdrop
 * click, and locks background scroll while open.
 */
function GalleryModal({ items, selectedIndex, onClose, onNext, onPrev }) {
  const isOpen = selectedIndex !== null
  const activeItem = isOpen ? items[selectedIndex] : null

  useEffect(() => {
    if (!isOpen) return undefined

    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNext()
      if (event.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, onNext, onPrev])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-dark/90 px-4 py-10"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <CloseIcon />
          </button>

          {items.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onPrev()
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeftIcon />
            </button>
          )}

          <motion.img
            key={activeItem.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            src={activeItem.image}
            alt={activeItem.alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[80vh] max-w-full rounded-card object-contain shadow-lifted"
          />

          {items.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                onNext()
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRightIcon />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GalleryModal
