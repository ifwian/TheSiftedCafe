import { useState } from 'react'
import Button from '../components/ui/Button.jsx'
import FormField from '../components/common/FormField.jsx'
import { inputClasses } from '../utils/formStyles.js'
import { useAuth } from '../hooks/useAuth.js'
import { changePasswordAdmin } from '../services/adminService.js'
import { ApiError } from '../services/api.js'
import usePageTitle from '../hooks/usePageTitle.js'

/**
 * Settings
 *
 * Change-password form. Not part of the MVP (spec section 84), added
 * afterward so the seeded dev admin password can actually be rotated
 * without going into Prisma Studio by hand.
 */
function Settings() {
  usePageTitle('Settings')

  const { user } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    if (newPassword.length < 8) {
      setStatus('error')
      setMessage('New password must be at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setStatus('error')
      setMessage('New password and confirmation do not match.')
      return
    }

    setStatus('submitting')
    try {
      await changePasswordAdmin(currentPassword, newPassword)
      setStatus('success')
      setMessage('Password updated successfully.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof ApiError
          ? error.message
          : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1>Settings</h1>

      <div className="max-w-md rounded-card bg-white p-6 shadow-soft">
        <h2 className="text-lg">Account</h2>
        <p className="mt-1 text-sm text-dark/60">
          Signed in as {user?.name} ({user?.email})
        </p>

        <h3 className="mt-6 text-base">Change Password</h3>
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-4">
          <FormField label="Current Password" id="settings-current-password">
            <input
              id="settings-current-password"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className={inputClasses(status === 'error')}
              required
            />
          </FormField>

          <FormField label="New Password" id="settings-new-password">
            <input
              id="settings-new-password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className={inputClasses(status === 'error')}
              required
              minLength={8}
            />
          </FormField>

          <FormField label="Confirm New Password" id="settings-confirm-password">
            <input
              id="settings-confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={inputClasses(status === 'error')}
              required
              minLength={8}
            />
          </FormField>

          {message && (
            <p className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-coffee'}`}>
              {message}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={status === 'submitting'}
            className="self-start"
          >
            {status === 'submitting' ? 'Updating…' : 'Update Password'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Settings
