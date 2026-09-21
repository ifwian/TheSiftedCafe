const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const AUTH_TOKEN_KEY = 'sifted_cafe_admin_token'

/**
 * ApiError
 *
 * Thrown for any non-2xx response, carrying the HTTP status and the
 * server's own message (spec section 30's `{ success: false, message }`
 * shape) so callers can show something meaningful instead of a generic
 * failure.
 */
export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

async function request(path, options = {}) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)

  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    })
  } catch {
    throw new ApiError(0, 'Network error. Please check your connection.')
  }

  let body = null
  try {
    body = await response.json()
  } catch {
    // No JSON body (e.g. a plain 204 or an unexpected non-JSON error page)
  }

  if (!response.ok) {
    throw new ApiError(response.status, body?.message || 'Something went wrong.')
  }

  return body
}

/**
 * api
 *
 * Single place every service file goes through, so base URL, headers,
 * and error handling never get duplicated per-request (spec section 81).
 */
export const api = {
  get: (path) => request(path),
  post: (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) }),
  put: (path, data) => request(path, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (path, data) => request(path, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (path) => request(path, { method: 'DELETE' }),
}

export const authToken = {
  get: () => localStorage.getItem(AUTH_TOKEN_KEY),
  set: (token) => localStorage.setItem(AUTH_TOKEN_KEY, token),
  clear: () => localStorage.removeItem(AUTH_TOKEN_KEY),
}
