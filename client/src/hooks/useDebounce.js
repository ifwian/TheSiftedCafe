import { useEffect, useState } from 'react'

/**
 * useDebounce
 *
 * Delays updating the returned value until `delay` ms have passed without
 * the input changing again. Used by the Menu search box so filtering
 * doesn't re-run on every keystroke.
 */
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeoutId)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
