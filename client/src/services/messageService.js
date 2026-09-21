import { api } from './api.js'

export async function submitMessage(values) {
  const response = await api.post('/messages', values)
  return response.data
}
