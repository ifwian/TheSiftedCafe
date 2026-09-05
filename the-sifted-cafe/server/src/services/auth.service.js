import bcrypt from 'bcryptjs'
import { prisma } from '../config/prisma.js'
import { signToken } from '../utils/jwt.js'
import { ApiError } from '../middleware/errorHandler.js'

/**
 * login
 *
 * Deliberately returns the same generic error whether the email doesn't
 * exist or the password is wrong (spec section 68 -- don't expose whether
 * a specific email exists / account enumeration).
 */
export async function login(email, password) {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    throw new ApiError(401, 'Invalid email or password.')
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash)
  if (!passwordMatches) {
    throw new ApiError(401, 'Invalid email or password.')
  }

  const token = signToken({ userId: user.id, role: user.role })

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  }
}

/**
 * changePassword
 *
 * Requires the current password to be correct before allowing a change
 * (spec section 44 -- Settings). Never allows setting a password without
 * proving you already know the old one.
 */
export async function changePassword(userId, currentPassword, newPassword) {
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    throw new ApiError(404, 'User not found.')
  }

  const currentMatches = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!currentMatches) {
    throw new ApiError(401, 'Current password is incorrect.')
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newPasswordHash },
  })
}
