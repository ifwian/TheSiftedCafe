import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin', end: true },
  { label: 'Menu', to: '/admin/menu' },
  { label: 'Reservations', to: '/admin/reservations' },
  { label: 'Messages', to: '/admin/messages' },
  { label: 'Reviews', to: '/admin/reviews' },
  { label: 'Settings', to: '/admin/settings' },
]

/**
 * AdminSidebar
 *
 * `onNavigate` is called after a link is clicked, letting AdminLayout
 * close the mobile drawer -- harmless no-op on desktop.
 */
function AdminSidebar({ onNavigate }) {
  return (
    <nav className="flex h-full flex-col gap-1 p-4">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive ? 'bg-coffee text-white' : 'text-dark/70 hover:bg-dark/5'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default AdminSidebar
