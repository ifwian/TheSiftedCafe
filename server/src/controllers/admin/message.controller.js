import { asyncHandler } from '../../utils/asyncHandler.js'
import {
  getAllMessages,
  updateMessageStatus,
} from '../../services/message.service.js'

export const listAllMessages = asyncHandler(async (req, res) => {
  const messages = await getAllMessages()
  res.status(200).json({ success: true, data: messages })
})

export const updateMessageStatusHandler = asyncHandler(async (req, res) => {
  const message = await updateMessageStatus(req.params.id, req.body.status)
  res.status(200).json({ success: true, message: 'Message updated.', data: message })
})
