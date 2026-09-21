import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import Button from '../ui/Button.jsx'
import { NAV_LINKS } from '../../data/navLinks.js'

/**
 * MobileMenu
 *
 * The collapsible panel shown under the Navbar below the `md` breakpoint.
 * Kept as its own component (rather than inline in Navbar) so the
 * animation and link list are easy to reason about independently.
 */
function MobileMenu({ open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden border-t border-dark/5 bg-cream md:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-6">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-coffee/10 text-coffee'
                        : 'text-dark/80 hover:bg-dark/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="border-t border-dark/5 px-6 py-5">
            <Button to="/reservation" variant="accent" className="w-full justify-center">
              Reserve a Table
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
