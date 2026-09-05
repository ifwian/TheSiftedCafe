const BRAND_COLOR = '#6F4E37'

/**
 * Minimal, table-free HTML that renders reasonably in most email clients.
 * Kept intentionally simple -- no external CSS, no images to host.
 */
function wrapper(title, bodyHtml) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #211C18;">
      <h2 style="color: ${BRAND_COLOR}; margin-bottom: 16px;">The Sifted Cafe</h2>
      <h3 style="margin-bottom: 12px;">${title}</h3>
      ${bodyHtml}
      <p style="margin-top: 32px; font-size: 12px; color: #888;">
        This is an automated message from The Sifted Cafe.
      </p>
    </div>
  `
}

export function reservationConfirmationEmail(reservation) {
  const dateLabel = new Date(reservation.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return wrapper(
    'Your reservation request was received',
    `
      <p>Hi ${reservation.customerName},</p>
      <p>Thanks for your reservation request. Here's what we have on file:</p>
      <ul>
        <li><strong>Date:</strong> ${dateLabel}</li>
        <li><strong>Time:</strong> ${reservation.time}</li>
        <li><strong>Guests:</strong> ${reservation.guests}</li>
      </ul>
      <p>Your request is currently <strong>pending</strong>. We'll confirm it shortly.</p>
    `,
  )
}

export function newReservationAlertEmail(reservation) {
  const dateLabel = new Date(reservation.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return wrapper(
    'New reservation request',
    `
      <p><strong>${reservation.customerName}</strong> requested a table.</p>
      <ul>
        <li><strong>Date:</strong> ${dateLabel} at ${reservation.time}</li>
        <li><strong>Guests:</strong> ${reservation.guests}</li>
        <li><strong>Email:</strong> ${reservation.email}</li>
        <li><strong>Phone:</strong> ${reservation.phone}</li>
        ${reservation.specialRequest ? `<li><strong>Note:</strong> ${reservation.specialRequest}</li>` : ''}
      </ul>
      <p>Log in to the admin dashboard to confirm or update it.</p>
    `,
  )
}

export function newMessageAlertEmail(message) {
  return wrapper(
    'New contact message',
    `
      <p><strong>${message.name}</strong> (${message.email}) sent a message.</p>
      <p><strong>Subject:</strong> ${message.subject}</p>
      <p style="white-space: pre-wrap;">${message.message}</p>
    `,
  )
}
