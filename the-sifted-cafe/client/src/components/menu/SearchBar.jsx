/**
 * SearchBar
 *
 * A controlled search input (spec section 19 and section 95). Kept
 * unopinionated about what it searches -- the parent decides.
 */
function SearchBar({ value, onChange, placeholder = 'Search the menu…' }) {
  return (
    <div className="w-full max-w-md">
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search menu items"
        className="w-full rounded-full border border-dark/10 bg-white px-5 py-3 text-sm text-dark placeholder:text-dark/40 focus:border-coffee/50 focus:outline-none focus:ring-2 focus:ring-coffee/20"
      />
    </div>
  )
}

export default SearchBar
