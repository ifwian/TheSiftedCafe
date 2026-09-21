import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button.jsx'
import FormField from '../../components/common/FormField.jsx'
import { inputClasses } from '../../utils/formStyles.js'
import { useAuth } from '../../hooks/useAuth.js'
import { ApiError } from '../../services/api.js'
import usePageTitle from '../../hooks/usePageTitle.js'

/**
 * AdminLogin
 *
 * Spec section 68: brand, "Admin Portal" subtitle, email/password,
 * loading state, invalid-credentials state, server-error state. Sends
 * the user back to wherever they were headed before being redirected
 * here (see ProtectedRoute).
 */
function AdminLogin() {
  usePageTitle('Admin Login')

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname ?? '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | error
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      await login(email, password)
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : 'Something went wrong. Please try again.',
      )
      setStatus('error')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-6">
      <div className="w-full max-w-sm rounded-card bg-white p-8 shadow-lifted">
        <div className="mb-8 text-center">
          <p className="font-display text-lg font-semibold text-dark">
            THE SIFTED CAFE
          </p>
          <p className="mt-1 text-sm text-dark/60">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <FormField label="Email" id="admin-email">
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClasses(status === 'error')}
              required
            />
          </FormField>

          <FormField label="Password" id="admin-password">
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClasses(status === 'error')}
              required
            />
          </FormField>

          {status === 'error' && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={status === 'submitting'}
            className="mt-2 justify-center"
          >
            {status === 'submitting' ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
