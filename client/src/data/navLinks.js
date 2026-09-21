/**
 * Shared public navigation link list — used by both Navbar (desktop) and
 * MobileMenu, so the two can never drift out of sync (spec section 4 —
 * avoid duplicated data).
 */
export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]
