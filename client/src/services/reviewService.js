import { api } from './api.js'

export async function getPublishedReviews() {
  const response = await api.get('/reviews')
  return response.data
}
