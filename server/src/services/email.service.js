import { transporter } from '../config/email.js'
import { env } from '../config/env.js'
import {
  reservationConfirmationEmail,
  newReservationAlertEmail,
  newMessageAlertEmail,
} from '../utils/emailTemplates.js'

/**
 * sendMail
 *
 * Deliberately never throws. A failed email should never take down a
 * reservation/message submission that already succeeded in the database
 * -- it just logs and moves on.
 */
async function sendMail(to, subject, html) {
  if (!transporter) {
    console.warn('Email not sent (EMAIL_USER/EMAIL_APP_PASSWORD not configured):', subject)
    return
  }

  try {
    await transporter.sendMail({
      from: `"The Sifted Cafe" <${env.email.user}>`,
      to,
      subject,
      html,
    })
  } catch (error) {
    console.error('Failed to send email:', error.message)
  }
}

export async function notifyReservationCreated(reservation) {
  await sendMail(
    reservation.email,
    'Your reservation request — The Sifted Cafe',
    reservationConfirmationEmail(reservation),
  )
  await sendMail(
    env.email.adminNotificationEmail,
    `New reservation: ${reservation.customerName}`,
    newReservationAlertEmail(reservation),
  )
}

export async function notifyMessageCreated(message) {
  await sendMail(
    env.email.adminNotificationEmail,
    `New message: ${message.subject}`,
    newMessageAlertEmail(message),
  )
}
