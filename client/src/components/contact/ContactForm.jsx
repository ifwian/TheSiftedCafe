import { useState } from 'react'
import Button from '../ui/Button.jsx'
import FormField from '../common/FormField.jsx'
import { inputClasses } from '../../utils/formStyles.js'
import { isValidEmail } from '../../utils/validators.js'
import { submitMessage } from '../../services/messageService.js'
import { ApiError } from '../../services/api.js'

const INITIAL_VALUES = {
  name: '',
  email: '',
  subject: '',
  message: '',
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

  if (!values.subject.trim()) errors.subject = 'Please add a subject.'

  if (!values.message.trim()) {
    errors.message = 'Please write a message.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Please write a bit more detail (10+ characters).'
  }

  return errors
}

/**
 * ContactForm
 *
 * Client-side validation is UX only (spec section 24). Submits to
 * POST /api/messages.
 */
function ContactForm() {
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
      await submitMessage(values)
      setStatus('success')
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : 'Something went wrong sending your message. Please try again.',
      )
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-card bg-white p-10 text-center shadow-soft">
        <span className="text-eyebrow">Message Sent</span>
        <h2>Thanks, {values.name.split(' ')[0]}!</h2>
        <p className="max-w-sm text-dark/70">
          We&apos;ve received your message and will get back to you soon.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setValues(INITIAL_VALUES)
            setErrors({})
            setStatus('idle')
          }}
        >
          Send Another Message
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
        <FormField label="Full Name" id="contact-name" error={errors.name}>
          <input
            id="contact-name"
            type="text"
            value={values.name}
            onChange={handleChange('name')}
            className={inputClasses(Boolean(errors.name))}
            placeholder="Juan Dela Cruz"
          />
        </FormField>

        <FormField label="Email" id="contact-email" error={errors.email}>
          <input
            id="contact-email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            className={inputClasses(Boolean(errors.email))}
            placeholder="you@example.com"
          />
        </FormField>
      </div>

      <FormField label="Subject" id="contact-subject" error={errors.subject}>
        <input
          id="contact-subject"
          type="text"
          value={values.subject}
          onChange={handleChange('subject')}
          className={inputClasses(Boolean(errors.subject))}
          placeholder="What's this about?"
        />
      </FormField>

      <FormField label="Message" id="contact-message" error={errors.message}>
        <textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={handleChange('message')}
          className={inputClasses(Boolean(errors.message))}
          placeholder="Tell us how we can help..."
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
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}

export default ContactForm
