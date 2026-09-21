import { useState } from 'react'
import useFetch from '../../hooks/useFetch.js'
import { useToast } from '../../hooks/useToast.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import Button from '../../components/ui/Button.jsx'
import LoadingState from '../../components/common/LoadingState.jsx'
import ErrorState from '../../components/common/ErrorState.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import Modal from '../../components/common/Modal.jsx'
import { getAllMessagesAdmin, updateMessageStatusAdmin } from '../../services/adminService.js'

const STATUS_STYLES = {
  UNREAD: 'bg-accent/20 text-accent-dark',
  READ: 'bg-coffee/10 text-coffee',
  ARCHIVED: 'bg-dark/10 text-dark/50',
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * MessageManagement (spec section 48). Opening a message marks it READ;
 * ARCHIVED is a one-way action for now (no "unarchive" in the spec).
 */
function MessageManagement() {
  usePageTitle('Message Management')

  const { showToast } = useToast()
  const {
    data: messages,
    error,
    isLoading,
    refetch,
  } = useFetch(getAllMessagesAdmin, [])
  const [openMessage, setOpenMessage] = useState(null)

  async function handleStatusChange(id, status) {
    try {
      await updateMessageStatusAdmin(id, status)
      refetch()
    } catch (err) {
      showToast(err.message || 'Failed to update message.', 'error')
    }
  }

  function handleOpen(message) {
    setOpenMessage(message)
    if (message.status === 'UNREAD') {
      handleStatusChange(message.id, 'READ')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Message Management</h1>

      {isLoading && <LoadingState label="Loading messages…" />}
      {error && <ErrorState title="Unable to load messages." onRetry={refetch} />}
      {messages && messages.length === 0 && <EmptyState title="No messages yet." />}

      {messages && messages.length > 0 && (
        <div className="overflow-x-auto rounded-card bg-white shadow-soft">
          <table className="hidden w-full text-left text-sm md:table">
            <thead className="border-b border-dark/10 text-xs uppercase tracking-wide text-dark/50">
              <tr>
                <th className="px-4 py-3">Sender</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id} className="border-b border-dark/5 last:border-0">
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleOpen(message)}
                      className="text-left font-medium text-dark hover:text-coffee"
                    >
                      {message.name}
                    </button>
                    <p className="text-xs text-dark/50">{message.email}</p>
                  </td>
                  <td className="px-4 py-3 text-dark/70">{message.subject}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[message.status]}`}
                    >
                      {message.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-dark/70">{formatDate(message.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleOpen(message)}>
                        Open
                      </Button>
                      {message.status !== 'ARCHIVED' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusChange(message.id, 'ARCHIVED')}
                        >
                          Archive
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className="flex flex-col gap-4 p-4 md:hidden">
            {messages.map((message) => (
              <div key={message.id} className="rounded-card border border-dark/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-dark">{message.name}</p>
                    <p className="text-xs text-dark/50">{message.email}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[message.status]}`}
                  >
                    {message.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-dark/70">{message.subject}</p>
                <p className="mt-1 text-xs text-dark/40">{formatDate(message.createdAt)}</p>
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpen(message)}
                    className="flex-1 justify-center"
                  >
                    Open
                  </Button>
                  {message.status !== 'ARCHIVED' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(message.id, 'ARCHIVED')}
                      className="flex-1 justify-center"
                    >
                      Archive
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        open={Boolean(openMessage)}
        onClose={() => setOpenMessage(null)}
        title={openMessage?.subject ?? ''}
      >
        {openMessage && (
          <div className="flex flex-col gap-3 text-sm">
            <p className="text-dark/50">
              From {openMessage.name} ({openMessage.email})
            </p>
            <p className="whitespace-pre-wrap text-dark/80">{openMessage.message}</p>
            <div className="mt-2 flex justify-end gap-3">
              {openMessage.status !== 'ARCHIVED' && (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleStatusChange(openMessage.id, 'ARCHIVED')
                    setOpenMessage(null)
                  }}
                >
                  Archive
                </Button>
              )}
              <Button variant="primary" onClick={() => setOpenMessage(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default MessageManagement
