import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'

/**
 * PublicLayout
 *
 * Shared shell for every public-facing route: fixed Navbar, routed page
 * content via <Outlet />, and the Footer. `pt-20` offsets the content by
 * exactly the Navbar's height (`h-20`) since the Navbar is fixed.
 */
function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
