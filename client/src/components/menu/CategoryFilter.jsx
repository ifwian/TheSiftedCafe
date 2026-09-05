import FilterPills from '../common/FilterPills.jsx'

/**
 * CategoryFilter
 *
 * "All" plus one pill per category. Categories are passed in as data
 * (spec section 16 — categories should be database-driven, not hardcoded
 * in React) so this component has no knowledge of what the categories are.
 */
function CategoryFilter({ categories, active, onChange }) {
  const options = ['All', ...categories.map((category) => category.name)]

  return <FilterPills options={options} active={active} onChange={onChange} />
}

export default CategoryFilter
