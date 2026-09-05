import useFetch from '../hooks/useFetch.js'
import { useToast } from '../hooks/useToast.js'
import usePageTitle from '../hooks/usePageTitle.js'
import Button from '../components/ui/Button.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import ErrorState from '../components/common/ErrorState.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import {
  getAllReservationsAdmin,
  updateReservationStatusAdmin,
} from '../services/adminService.js'

const STATUS_STYLES = {
  PENDING: 'bg-accent/20 text-accent-dark',
  CONFIRMED: 'bg-coffee/10 text-coffee',
  CANCELLED: 'bg-red-100 text-red-600',
  COMPLETED: 'bg-dark/10 text-dark/50',
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * ReservationManagement (spec section 47). Table on desktop, cards on
 * mobile; PENDING/CONFIRMED/CANCELLED/COMPLETED status actions.
 */
function ReservationManagement() {
  usePageTitle('Reservation Management')

  const { showToast } = useToast()
  const {
    data: reservations,
    error,
    isLoading,
    refetch,
  } = useFetch(getAllReservationsAdmin, [])

  async function handleStatusChange(id, status) {
    try {
      await updateReservationStatusAdmin(id, status)
      showToast(`Reservation marked as ${status.toLowerCase()}.`)
      refetch()
    } catch (err) {
      showToast(err.message || 'Failed to update reservation.', 'error')
    }
  }

  function StatusActions({ reservation }) {
    return (
      <>
        {reservation.status !== 'CONFIRMED' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStatusChange(reservation.id, 'CONFIRMED')}
          >
            Confirm
          </Button>
        )}
        {reservation.status !== 'CANCELLED' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStatusChange(reservation.id, 'CANCELLED')}
            className="text-red-600 hover:text-red-700"
          >
            Cancel
          </Button>
        )}
        {reservation.status !== 'COMPLETED' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStatusChange(reservation.id, 'COMPLETED')}
          >
            Complete
          </Button>
        )}
      </>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Reservation Management</h1>

      {isLoading && <LoadingState label="Loading reservations…" />}
      {error && (
        <ErrorState title="Unable to load reservations." onRetry={refetch} />
      )}
      {reservations && reservations.length === 0 && (
        <EmptyState title="No reservations yet." />
      )}

      {reservations && reservations.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-card bg-white shadow-soft md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-dark/10 text-xs uppercase tracking-wide text-dark/50">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Guests</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr
                    key={reservation.id}
                    className="border-b border-dark/5 align-top last:border-0"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-dark">{reservation.customerName}</p>
                      <p className="text-xs text-dark/50">
                        {reservation.email} · {reservation.phone}
                      </p>
                      {reservation.specialRequest && (
                        <p className="mt-1 text-xs text-dark/50">
                          Note: {reservation.specialRequest}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-dark/70">{formatDate(reservation.date)}</td>
                    <td className="px-4 py-3 text-dark/70">{reservation.time}</td>
                    <td className="px-4 py-3 text-dark/70">{reservation.guests}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[reservation.status]}`}
                      >
                        {reservation.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap justify-end gap-2">
                        <StatusActions reservation={reservation} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-4 md:hidden">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="rounded-card bg-white p-4 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-dark">{reservation.customerName}</p>
                    <p className="text-xs text-dark/50">
                      {reservation.email} · {reservation.phone}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[reservation.status]}`}
                  >
                    {reservation.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-dark/70">
                  {formatDate(reservation.date)} at {reservation.time} · {reservation.guests}{' '}
                  guests
                </p>
                {reservation.specialRequest && (
                  <p className="mt-1 text-xs text-dark/50">
                    Note: {reservation.specialRequest}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusActions reservation={reservation} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ReservationManagement
