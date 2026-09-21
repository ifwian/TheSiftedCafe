import { api } from './api.js'

export async function submitReservation(values) {
  const response = await api.post('/reservations', values)
  return response.data
}
