import SectionHeading from '../common/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import LoadingState from '../common/LoadingState.jsx'
import MenuCard from './MenuCard.jsx'
import useFetch from '../../hooks/useFetch.js'
import { getFeaturedMenuItems } from '../../services/menuService.js'

/**
 * Featured Menu homepage section (spec section 15). Fetches from
 * GET /api/menu/featured (Milestone 10) instead of mock data.
 */
function FeaturedMenuSection() {
  const { data: items, isLoading } = useFetch(getFeaturedMenuItems, [])

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading
        align="center"
        eyebrow="Customer Favorites"
        title="What people keep coming back for"
        className="mx-auto mb-12 max-w-xl"
      />

      {isLoading ? (
        <LoadingState label="Loading favorites…" />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(items ?? []).map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Button to="/menu" variant="outline">
          View Full Menu
        </Button>
      </div>
    </section>
  )
}

export default FeaturedMenuSection
