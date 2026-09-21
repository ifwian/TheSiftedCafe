import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import Button from '../components/ui/Button.jsx'
import AdminSidebar from '../components/admin/AdminSidebar.jsx'
import { MenuIcon, CloseIcon } from '../components/ui/icons.jsx'

/**
 * AdminLayout
 *
 * Desktop: fixed sidebar + top bar (spec section 44). Mobile: sidebar
 * becomes a drawer opened from the top bar's hamburger button (spec
 * section 69).
 */
function AdminLayout() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-dark/[0.02] md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-dark/10 bg-white md:block">
        <div className="border-b border-dark/10 px-4 py-5">
          <span className="font-display text-base font-semibold text-dark">
            THE SIFTED CAFE
          </span>
          <p className="text-xs text-dark/50">Admin Portal</p>
        </div>
        <AdminSidebar />
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-dark/10 bg-white px-4 py-4 md:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-dark hover:bg-dark/5 md:hidden"
          >
            <MenuIcon />
          </button>
          <span className="font-display text-base font-semibold text-dark md:hidden">
            Admin
          </span>
          <div className="flex items-center gap-4">
            {user?.name && (
              <span className="hidden text-sm text-dark/60 sm:inline">
                Signed in as {user.name}
              </span>
            )}
            <Button variant="outline" size="sm" onClick={logout}>
              Log Out
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-dark/40"
          />
          <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-lifted">
            <div className="flex items-center justify-between border-b border-dark/10 px-4 py-4">
              <span className="font-display text-base font-semibold text-dark">
                Admin
              </span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full text-dark hover:bg-dark/5"
              >
                <CloseIcon />
              </button>
            </div>
            <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLayout
