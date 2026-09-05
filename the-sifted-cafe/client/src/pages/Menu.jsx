import { useMemo, useState } from 'react'
import SectionHeading from '../components/common/SectionHeading.jsx'
import CategoryFilter from '../components/menu/CategoryFilter.jsx'
import SearchBar from '../components/menu/SearchBar.jsx'
import MenuGrid from '../components/menu/MenuGrid.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import ErrorState from '../components/common/ErrorState.jsx'
import useDebounce from '../hooks/useDebounce.js'
import useFetch from '../hooks/useFetch.js'
import usePageTitle from '../hooks/usePageTitle.js'
import { getMenuItems } from '../services/menuService.js'
import { getCategories } from '../services/categoryService.js'

/**
 * Menu
 *
 * Fetches the full item list and category list once from the real API
 * (GET /api/menu, GET /api/categories -- Milestone 10), then filters and
 * searches client-side, which spec section 19 explicitly allows for a
 * dataset this small.
 */
function Menu() {
  usePageTitle('Menu')

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const debouncedSearch = useDebounce(search, 250)

  const {
    data: items,
    error: itemsError,
    isLoading: itemsLoading,
    refetch: refetchItems,
  } = useFetch(getMenuItems, [])

  const { data: categories, isLoading: categoriesLoading } = useFetch(
    getCategories,
    [],
  )

  const filteredItems = useMemo(() => {
    if (!items) return []
    const term = debouncedSearch.trim().toLowerCase()

    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory

      if (!matchesCategory) return false
      if (!term) return true

      return (
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      )
    })
  }, [items, debouncedSearch, activeCategory])

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading
        align="center"
        eyebrow="Menu"
        title="Explore what's brewing"
        description="Browse by category or search for something specific."
        className="mx-auto mb-10 max-w-xl"
      />

      <div className="mb-10 flex flex-col items-center gap-6">
        <SearchBar value={search} onChange={setSearch} />
        {!categoriesLoading && categories && (
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        )}
      </div>

      {itemsLoading && <LoadingState label="Loading the menu…" />}

      {itemsError && (
        <ErrorState
          title="Unable to load the menu."
          description="Please check your connection and try again."
          onRetry={refetchItems}
        />
      )}

      {!itemsLoading && !itemsError && <MenuGrid items={filteredItems} />}
    </div>
  )
}

export default Menu
