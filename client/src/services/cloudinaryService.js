const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB

export class CloudinaryUploadError extends Error {}

/**
 * Checked before ever hitting the network -- fail fast with a clear
 * message instead of letting Cloudinary reject it.
 */
export function validateImageFile(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new CloudinaryUploadError('Please choose a JPEG, PNG, or WebP image.')
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new CloudinaryUploadError('Image must be smaller than 5MB.')
  }
}

/**
 * uploadImage
 *
 * Uploads directly from the browser to Cloudinary using an unsigned
 * upload preset (no backend involvement needed). This endpoint is only
 * reachable from the admin Menu Management form, which already sits
 * behind login -- see README for the small tradeoff this simplicity
 * accepts (the preset name is visible in the browser bundle).
 */
export async function uploadImage(file) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new CloudinaryUploadError(
      'Image upload is not configured yet. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.',
    )
  }

  validateImageFile(file)

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', 'the-sifted-cafe/menu')

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData },
  )

  if (!response.ok) {
    throw new CloudinaryUploadError('Image upload failed. Please try again.')
  }

  const data = await response.json()
  return data.secure_url
}
