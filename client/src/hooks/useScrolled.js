import { useEffect, useState } from 'react'

/**
 * useScrolled
 *
 * Tracks whether the page has been scrolled past `threshold` pixels.
 * Used by the Navbar to switch from a transparent/minimal state at the top
 * of the page to a slightly solid background + shadow once the user starts
 * scrolling (spec section 9).
 */
function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}

export default useScrolled
