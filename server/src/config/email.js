import nodemailer from 'nodemailer'
import { env } from './env.js'

/**
 * Gmail SMTP transporter (spec: Email Notification Module).
 *
 * Requires a Gmail App Password, not the regular account password --
 * Gmail blocks plain password auth for third-party apps. To generate one:
 * Google Account -> Security -> 2-Step Verification (must be on)
 * -> App Passwords -> create one for "Mail".
 *
 * If EMAIL_USER/EMAIL_APP_PASSWORD aren't set, `transporter` is null and
 * email.service.js quietly skips sending instead of crashing the app --
 * email is a nice-to-have, not something that should take down
 * reservations/messages if misconfigured.
 */
export const transporter =
  env.email.user && env.email.appPassword
    ? nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: env.email.user,
          pass: env.email.appPassword,
        },
      })
    : null
