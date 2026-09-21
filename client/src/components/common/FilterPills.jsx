/**
 * FilterPills
 *
 * Low-level pill-button group shared by the Menu category filter and the
 * Gallery category filter, so both stay visually and behaviorally
 * identical without duplicating the button markup (spec section 4).
 */
function FilterPills({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {options.map((option) => {
        const isActive = option === active
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={isActive}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-coffee text-white'
                : 'border border-dark/10 bg-white text-dark/70 hover:border-coffee/40 hover:text-coffee'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default FilterPills
