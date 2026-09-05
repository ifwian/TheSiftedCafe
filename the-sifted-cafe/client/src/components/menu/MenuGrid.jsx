import MenuCard from './MenuCard.jsx'
import EmptyState from '../common/EmptyState.jsx'

/**
 * MenuGrid
 *
 * Renders the filtered/searched item list, or the empty state defined in
 * spec section 19 when nothing matches.
 */
function MenuGrid({ items }) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="No menu items found."
        description="Try another search or category."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default MenuGrid
