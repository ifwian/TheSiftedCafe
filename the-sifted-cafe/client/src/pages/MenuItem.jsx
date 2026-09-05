import { useParams } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import MenuCard from '../components/menu/MenuCard.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import useFetch from '../hooks/useFetch.js'
import usePageTitle from '../hooks/usePageTitle.js'
import { getMenuItemById, getMenuItemsByCategory } from '../services/menuService.js'

/**
 * MenuItem
 *
 * Fetches a single item from GET /api/menu/:id, then a second request for
 * related items in the same category once the first request resolves.
 */
function MenuItem() {
  const { id } = useParams()

  const {
    data: item,
    error,
    isLoading,
  } = useFetch(() => getMenuItemById(id), [id])

  const { data: categoryItems } = useFetch(
    () => (item ? getMenuItemsByCategory(item.categorySlug) : Promise.resolve([])),
    [item?.categorySlug],
  )

  usePageTitle(item ? item.name : 'Menu Item')

  if (isLoading) {
    return <LoadingState label="Loading item…" />
  }

  if (error || !item) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <h1>Item not found</h1>
        <p className="text-dark/70">
          This menu item may have been removed or is no longer available.
        </p>
        <Button to="/menu">Back to Menu</Button>
      </div>
    )
  }

  const relatedItems = (categoryItems ?? [])
    .filter((related) => related.id !== item.id)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Button to="/menu" variant="ghost" className="mb-8">
        ← Back to Menu
      </Button>

      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="overflow-hidden rounded-card shadow-soft">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-eyebrow">{item.category}</span>
            {item.isFeatured && (
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-dark">
                Featured
              </span>
            )}
          </div>
          <h1>{item.name}</h1>
          <p className="text-lg font-semibold text-coffee">₱{item.price}</p>
          <p className="text-dark/70">{item.description}</p>
          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
              item.isAvailable
                ? 'bg-coffee/10 text-coffee'
                : 'bg-dark/10 text-dark/50'
            }`}
          >
            {item.isAvailable ? 'Available' : 'Currently unavailable'}
          </span>
        </div>
      </div>

      {relatedItems.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-6">Related Items</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedItems.map((relatedItem) => (
              <MenuCard key={relatedItem.id} item={relatedItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuItem
