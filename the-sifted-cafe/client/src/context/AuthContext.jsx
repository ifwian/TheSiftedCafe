import { useMemo, useState } from 'react'
import { login as loginRequest } from '../services/authService.js'
import { authToken } from '../services/api.js'
import { AuthContext } from './authContext.js'

/**
 * AuthProvider
 *
 * Holds the logged-in admin's info and exposes login/logout. The JWT
 * itself lives in localStorage (see services/api.js) so it survives a
 * page refresh; this context tracks the decoded user info in memory.
 *
 * There's no separate user record cached from a previous session, so
 * `isAuthenticated` falls back to "a token exists" until a real user
 * object is set by login(). Any protected API call made with a stale or
 * expired token will get a 401 back from the server, which
 * ProtectedRoute/AdminLayout can react to by logging the user out.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function login(email, password) {
    const result = await loginRequest(email, password)
    authToken.set(result.token)
    setUser(result.user)
    return result.user
  }

  function logout() {
    authToken.clear()
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user ?? authToken.get()),
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
