/**
 * GalleryGrid
 *
 * Responsive photo grid (spec section 20). Each thumbnail is a real button
 * (not a clickable div, per spec section 56) that opens the lightbox at
 * its index.
 */
function GalleryGrid({ items, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`View larger image: ${item.alt}`}
          className="group aspect-square overflow-hidden rounded-card"
        >
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </button>
      ))}
    </div>
  )
}

export default GalleryGrid
