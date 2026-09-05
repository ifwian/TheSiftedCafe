import { useState } from 'react'
import Button from '../ui/Button.jsx'
import FormField from '../common/FormField.jsx'
import { inputClasses } from '../../utils/formStyles.js'
import { uploadImage, CloudinaryUploadError } from '../../services/cloudinaryService.js'

const EMPTY_VALUES = {
  name: '',
  description: '',
  price: '',
  categoryId: '',
  imageUrl: '',
  isFeatured: false,
  isAvailable: true,
}

/**
 * MenuItemForm
 *
 * Shared between "Add Item" and "Edit Item" (spec section 46) -- same
 * fields either way, just pre-filled when editing.
 */
function MenuItemForm({ initialValues, categories, onSubmit, onCancel, isSubmitting }) {
  const [values, setValues] = useState(initialValues ?? EMPTY_VALUES)
  const [error, setError] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  // Re-sync the form when a different item is passed in (e.g. switching
  // from "Add Item" to "Edit Item", or between two different items)
  // without an effect -- tracking the previous prop in render is the
  // pattern React's docs recommend for this ("Adjusting state when a
  // prop changes"), and it avoids an extra render pass.
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

  async function handleFileChange(event) {
    const file = event.target.files?.[0]
    event.target.value = '' // allow re-selecting the same file later
    if (!file) return

    setError('')
    setIsUploading(true)
    try {
      const uploadedUrl = await uploadImage(file)
      setValues((prev) => ({ ...prev, imageUrl: uploadedUrl }))
    } catch (err) {
      setError(
        err instanceof CloudinaryUploadError
          ? err.message
          : 'Image upload failed. Please try again.',
      )
    } finally {
      setIsUploading(false)
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
      <FormField label="Name" id="mi-name">
        <input
          id="mi-name"
          value={values.name}
          onChange={handleChange('name')}
          className={inputClasses(false)}
          required
        />
      </FormField>

      <FormField label="Description" id="mi-description">
        <textarea
          id="mi-description"
          rows={3}
          value={values.description}
          onChange={handleChange('description')}
          className={inputClasses(false)}
          required
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Price (₱)" id="mi-price">
          <input
            id="mi-price"
            type="number"
            step="0.01"
            min="0"
            value={values.price}
            onChange={handleChange('price')}
            className={inputClasses(false)}
            required
          />
        </FormField>

        <FormField label="Category" id="mi-category">
          <select
            id="mi-category"
            value={values.categoryId}
            onChange={handleChange('categoryId')}
            className={inputClasses(false)}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Photo" id="mi-image-file">
        <div className="flex items-start gap-4">
          {values.imageUrl && (
            <img
              src={values.imageUrl}
              alt="Preview"
              className="h-16 w-16 rounded-lg object-cover"
            />
          )}
          <div className="flex-1">
            <input
              id="mi-image-file"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              disabled={isUploading}
              className="block w-full text-sm text-dark/70 file:mr-3 file:rounded-lg file:border-0 file:bg-coffee file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-coffee-dark"
            />
            {isUploading && (
              <p className="mt-1 text-xs text-dark/50">Uploading…</p>
            )}
            <input
              type="url"
              value={values.imageUrl}
              onChange={handleChange('imageUrl')}
              className={`${inputClasses(false)} mt-2`}
              placeholder="or paste an image URL directly"
            />
          </div>
        </div>
      </FormField>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-dark/70">
          <input
            type="checkbox"
            checked={values.isFeatured}
            onChange={handleChange('isFeatured')}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-dark/70">
          <input
            type="checkbox"
            checked={values.isAvailable}
            onChange={handleChange('isAvailable')}
          />
          Available
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="mt-2 flex justify-end gap-3">
        <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={isSubmitting || isUploading}>
          {isSubmitting ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </form>
  )
}

export default MenuItemForm
