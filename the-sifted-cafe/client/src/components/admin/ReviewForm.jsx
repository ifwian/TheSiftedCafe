import { useState } from 'react'
import Button from '../ui/Button.jsx'
import FormField from '../common/FormField.jsx'
import { inputClasses } from '../../utils/formStyles.js'

const EMPTY_VALUES = {
  customerName: '',
  rating: 5,
  comment: '',
  isPublished: false,
}

/**
 * ReviewForm
 *
 * Shared between "Add Review" and "Edit Review" (spec section 37).
 */
function ReviewForm({ initialValues, onSubmit, onCancel, isSubmitting }) {
  const [values, setValues] = useState(initialValues ?? EMPTY_VALUES)
  const [error, setError] = useState('')

  const [prevInitialValues, setPrevInitialValues] = useState(initialValues)
  if (initialValues !== prevInitialValues) {
    setPrevInitialValues(initialValues)
    setValues(initialValues ?? EMPTY_VALUES)
  }

  function handleChange(field) {
    return (event) => {
      const value =
        event.target.type === 'checkbox' ? event.target.checked : event.target.value
      setValues((prev) => ({ ...prev, [field]: value }))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    try {
      await onSubmit(values)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label="Customer Name" id="rv-name">
        <input
          id="rv-name"
          value={values.customerName}
          onChange={handleChange('customerName')}
          className={inputClasses(false)}
          required
        />
      </FormField>

      <FormField label="Rating" id="rv-rating">
        <select
          id="rv-rating"
          value={values.rating}
          onChange={handleChange('rating')}
          className={inputClasses(false)}
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} star{n !== 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Comment" id="rv-comment">
        <textarea
          id="rv-comment"
          rows={3}
          value={values.comment}
          onChange={handleChange('comment')}
          className={inputClasses(false)}
          required
        />
      </FormField>

      <label className="flex items-center gap-2 text-sm text-dark/70">
        <input
          type="checkbox"
          checked={values.isPublished}
          onChange={handleChange('isPublished')}
        />
        Published (visible on the public website)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="mt-2 flex justify-end gap-3">
        <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </form>
  )
}

export default ReviewForm
