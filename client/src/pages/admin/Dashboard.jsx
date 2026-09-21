import { useAuth } from '../../hooks/useAuth.js'
import useFetch from '../../hooks/useFetch.js'
import { getDashboardStats } from '../../services/adminService.js'
import StatCard from '../../components/admin/StatCard.jsx'
import LoadingState from '../../components/common/LoadingState.jsx'
import ErrorState from '../../components/common/ErrorState.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'

/**
 * Dashboard
 *
 * Real counts from the database via GET /api/admin/stats (spec section
 * 45 -- no fake/placeholder analytics).
 */
function Dashboard() {
  usePageTitle('Dashboard')

  const { user } = useAuth()
  const { data: stats, error, isLoading, refetch } = useFetch(
    getDashboardStats,
    [],
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1>Welcome{user?.name ? `, ${user.name}` : ''}.</h1>
        <p className="mt-1 text-dark/60">Here&apos;s what&apos;s happening today.</p>
      </div>

      {isLoading && <LoadingState label="Loading dashboard…" />}

      {error && (
        <ErrorState
          title="Unable to load dashboard stats."
          description="Please check your connection and try again."
          onRetry={refetch}
        />
      )}

      {stats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Total Menu Items" value={stats.totalMenuItems} />
          <StatCard label="Available Items" value={stats.availableItems} />
          <StatCard label="Featured Items" value={stats.featuredItems} />
          <StatCard label="Pending Reservations" value={stats.pendingReservations} />
          <StatCard label="Confirmed Reservations" value={stats.confirmedReservations} />
          <StatCard label="Unread Messages" value={stats.unreadMessages} />
        </div>
      )}
    </div>
  )
}

export default Dashboard
