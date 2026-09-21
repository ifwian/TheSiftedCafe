import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import { CloseIcon, MenuIcon } from '../ui/icons.jsx'
import useScrolled from '../../hooks/useScrolled.js'
import { NAV_LINKS } from '../../data/navLinks.js'
import MobileMenu from './MobileMenu.jsx'

function Navbar() {
  const scrolled = useScrolled(8)
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu whenever the route changes (spec section 9).
  // Tracking the previous pathname in render (rather than resetting state
  // from inside a useEffect) avoids an extra render pass -- the pattern
  // React docs recommend for "adjusting state when a prop changes".
  const [prevPathname, setPrevPathname] = useState(location.pathname)
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname)
    setMenuOpen(false)
  }

  // Prevent background scroll while the mobile menu is open, and let
  // keyboard users dismiss it with Escape.
  useEffect(() => {
    if (!menuOpen) return undefined

    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-dark/5 bg-cream/95 shadow-soft backdrop-blur-md'
          : 'border-b border-transparent bg-cream/70 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <NavLink
          to="/"
          className="font-display text-lg font-semibold tracking-wide text-dark"
        >
          THE SIFTED CAFE
        </NavLink>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive ? 'text-coffee' : 'text-dark/80 hover:text-coffee'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button to="/reservation" variant="accent" size="sm">
            Reserve a Table
          </Button>
        </div>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="flex h-10 w-10 items-center justify-center rounded-full text-dark transition-colors hover:bg-dark/5 md:hidden"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      <MobileMenu open={menuOpen} />
    </header>
  )
}

export default Navbar
