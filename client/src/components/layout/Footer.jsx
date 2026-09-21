import { NavLink } from 'react-router-dom'
import { FacebookIcon, InstagramIcon } from '../ui/icons.jsx'
import { BUSINESS_INFO } from '../../data/businessInfo.js'

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reservation', to: '/reservation' },
  { label: 'Contact', to: '/contact' },
]

/**
 * Footer
 *
 * Address, hours, and social links all come from data/businessInfo.js --
 * update that one file with real details.
 */
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-dark/10 bg-dark text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1">
          <span className="font-display text-lg font-semibold text-white">
            THE SIFTED CAFE
          </span>
          <p className="text-sm text-white/60">
            Good coffee, good food, and a place to stay awhile.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-eyebrow text-white/50">Quick Links</span>
          <ul className="flex flex-col gap-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-eyebrow text-white/50">Visit Us</span>
          <address className="text-sm not-italic leading-relaxed text-white/70">
            {BUSINESS_INFO.address.line1}
            <br />
            {BUSINESS_INFO.address.line2}
          </address>
          {BUSINESS_INFO.hours.map((hours) => (
            <p key={hours.day} className="text-sm text-white/70">
              {hours.day}: {hours.time}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-eyebrow text-white/50">Follow Us</span>
          <div className="flex items-center gap-3">
            <a
              href={BUSINESS_INFO.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <InstagramIcon />
            </a>
            <a
              href={BUSINESS_INFO.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/40">
        © {year} The Sifted Cafe. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
