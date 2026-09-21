import { asyncHandler } from '../../utils/asyncHandler.js'
import { changePassword } from '../../services/auth.service.js'

/**
 * PATCH /api/admin/settings/password
 */
export const changePasswordHandler = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body
  await changePassword(req.user.userId, currentPassword, newPassword)

  res.status(200).json({
    success: true,
    message: 'Password updated successfully.',
  })
})
