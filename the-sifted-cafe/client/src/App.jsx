import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import ProtectedRoute from './components/common/ProtectedRoute.jsx'
import LoadingState from './components/common/LoadingState.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import MenuItem from './pages/MenuItem.jsx'
import About from './pages/About.jsx'
import Gallery from './pages/Gallery.jsx'
import Reservation from './pages/Reservation.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

/**
 * Admin pages and the internal design-system reference are lazy-loaded
 * (spec section 61 -- React.lazy/Suspense) since regular site visitors
 * never need this code in their initial bundle.
 */
const DesignSystemPreview = lazy(() => import('./pages/DesignSystemPreview.jsx'))
const AdminLogin = lazy(() => import('./admin/AdminLogin.jsx'))
const Dashboard = lazy(() => import('./admin/Dashboard.jsx'))
const MenuManagement = lazy(() => import('./admin/MenuManagement.jsx'))
const ReservationManagement = lazy(() => import('./admin/ReservationManagement.jsx'))
const MessageManagement = lazy(() => import('./admin/MessageManagement.jsx'))
const ReviewManagement = lazy(() => import('./admin/ReviewManagement.jsx'))
const Settings = lazy(() => import('./admin/Settings.jsx'))

/**
 * App.jsx handles application-level routing only. Public routes share
 * PublicLayout; admin routes share AdminLayout and are gated by
 * ProtectedRoute (spec section 67).
 */
function App() {
  return (
    <Suspense fallback={<LoadingState label="Loading…" />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuItem />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/contact" element={<Contact />} />
          {/* Internal design-system reference, not linked from navigation */}
          <Route path="/design-system" element={<DesignSystemPreview />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/menu" element={<MenuManagement />} />
            <Route path="/admin/reservations" element={<ReservationManagement />} />
            <Route path="/admin/messages" element={<MessageManagement />} />
            <Route path="/admin/reviews" element={<ReviewManagement />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
