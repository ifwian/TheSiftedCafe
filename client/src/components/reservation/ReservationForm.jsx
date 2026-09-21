import { useState } from 'react'
import Button from '../ui/Button.jsx'
import FormField from '../common/FormField.jsx'
import { inputClasses } from '../../utils/formStyles.js'
import {
  isValidEmail,
  isValidPhone,
  isFutureOrTodayDate,
  isValidGuestCount,
} from '../../utils/validators.js'
import { submitReservation } from '../../services/reservationService.js'
import { ApiError } from '../../services/api.js'

const INITIAL_VALUES = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  specialRequest: '',
  honeypot: '',
}

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please enter your name.'

  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Please enter your phone number.'
  } else if (!isValidPhone(values.phone)) {
    errors.phone = 'Please enter a valid phone number.'
  }

  if (!values.date) {
    errors.date = 'Please choose a date.'
  } else if (!isFutureOrTodayDate(values.date)) {
    errors.date = 'Please choose today or a future date.'
  }

  if (!values.time) errors.time = 'Please choose a time.'

  if (!isValidGuestCount(values.guests)) {
    errors.guests = 'Please enter a number of guests between 1 and 20.'
  }

  return errors
}

/**
 * ReservationForm
 *
 * Client-side validation is UX only (spec section 24) -- the backend's
 * Zod schema (Milestone 11) is the real gate. Submits to
 * POST /api/reservations.
 */
function ReservationForm() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus('submitting')
    try {
      await submitReservation(values)
      setStatus('success')
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : 'Something went wrong submitting your request. Please try again.',
      )
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-card bg-white p-10 text-center shadow-soft">
        <span className="text-eyebrow">Request Received</span>
        <h2>Thanks, {values.name.split(' ')[0]}!</h2>
        <p className="max-w-sm text-dark/70">
          Your reservation request has been submitted as{' '}
          <strong>pending</strong>. We will confirm the details with you
          shortly.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setValues(INITIAL_VALUES)
            setErrors({})
            setStatus('idle')
          }}
        >
          Make Another Reservation
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-card bg-white p-8 shadow-soft"
    >
      {/* Honeypot: invisible to real users, bots often fill every field */}
      <input
        type="text"
        name="website"
        value={values.honeypot}
        onChange={handleChange('honeypot')}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full Name" id="res-name" error={errors.name}>
          <input
            id="res-name"
            type="text"
            value={values.name}
            onChange={handleChange('name')}
            className={inputClasses(Boolean(errors.name))}
            placeholder="Juan Dela Cruz"
          />
        </FormField>

        <FormField label="Email" id="res-email" error={errors.email}>
          <input
            id="res-email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            className={inputClasses(Boolean(errors.email))}
            placeholder="you@example.com"
          />
        </FormField>

        <FormField label="Phone" id="res-phone" error={errors.phone}>
          <input
            id="res-phone"
            type="tel"
            value={values.phone}
            onChange={handleChange('phone')}
            className={inputClasses(Boolean(errors.phone))}
            placeholder="09XX XXX XXXX"
          />
        </FormField>

        <FormField
          label="Number of Guests"
          id="res-guests"
          error={errors.guests}
        >
          <input
            id="res-guests"
            type="number"
            min="1"
            max="20"
            value={values.guests}
            onChange={handleChange('guests')}
            className={inputClasses(Boolean(errors.guests))}
          />
        </FormField>

        <FormField label="Date" id="res-date" error={errors.date}>
          <input
            id="res-date"
            type="date"
            value={values.date}
            onChange={handleChange('date')}
            className={inputClasses(Boolean(errors.date))}
          />
        </FormField>

        <FormField label="Time" id="res-time" error={errors.time}>
          <input
            id="res-time"
            type="time"
            value={values.time}
            onChange={handleChange('time')}
            className={inputClasses(Boolean(errors.time))}
          />
        </FormField>
      </div>

      <FormField label="Special Request (optional)" id="res-notes">
        <textarea
          id="res-notes"
          rows={3}
          value={values.specialRequest}
          onChange={handleChange('specialRequest')}
          className={inputClasses(false)}
          placeholder="Birthday celebration, window seat, allergies, etc."
        />
      </FormField>

      {status === 'error' && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <Button
        type="submit"
        variant="accent"
        disabled={status === 'submitting'}
        className="self-start"
      >
        {status === 'submitting' ? 'Submitting…' : 'Request Reservation'}
      </Button>
    </form>
  )
}

export default ReservationForm
