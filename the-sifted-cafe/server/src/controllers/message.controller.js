import { asyncHandler } from '../utils/asyncHandler.js'
import { createMessage } from '../services/message.service.js'

/**
 * POST /api/messages
 */
export const submitMessage = asyncHandler(async (req, res) => {
  // Honeypot tripped: pretend success without touching the database or
  // sending email, so the bot has no signal that it was caught.
  if (req.body.honeypot) {
    return res.status(201).json({
      success: true,
      message: "Message sent. We'll get back to you soon.",
    })
  }

  const message = await createMessage(req.body)

  res.status(201).json({
    success: true,
    message: "Message sent. We'll get back to you soon.",
    data: message,
  })
})
