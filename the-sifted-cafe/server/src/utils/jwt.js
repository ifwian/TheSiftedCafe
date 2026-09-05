import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

const TOKEN_EXPIRY = '7d'

/**
 * Payload kept minimal on purpose (spec section 40) -- just enough to
 * identify and authorize the user, never sensitive data.
 */
export function signToken({ userId, role }) {
  return jwt.sign({ userId, role }, env.jwtSecret, { expiresIn: TOKEN_EXPIRY })
}

export function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret)
}
