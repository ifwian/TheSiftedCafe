import { Link } from 'react-router-dom'

/**
 * MenuCard
 *
 * Reusable menu item card (spec section 17). Used by the homepage Featured
 * Menu section now, and reused as-is for the full Menu page in Milestone 05.
 */
function MenuCard({ item }) {
  return (
    <Link
      to={`/menu/${item.id}`}
      className="group flex flex-col overflow-hidden rounded-card bg-white shadow-soft transition-transform duration-200 hover:-translate-y-1 hover:shadow-lifted"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg">{item.name}</h3>
          <span className="whitespace-nowrap font-semibold text-coffee">
            ₱{item.price}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-dark/70">
          {item.description}
        </p>
        <span
          className={`mt-auto text-xs font-medium ${
            item.isAvailable ? 'text-coffee' : 'text-dark/40'
          }`}
        >
          {item.isAvailable ? 'Available' : 'Currently unavailable'}
        </span>
      </div>
    </Link>
  )
}

export default MenuCard
