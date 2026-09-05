import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'

/**
 * ProtectedRoute
 *
 * Wraps admin routes. Unauthenticated visitors are redirected to
 * /admin/login (spec section 67), remembering where they were headed so
 * AdminLogin can send them back after a successful login.
 */
function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
