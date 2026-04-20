import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { BASE_URL } from '@/constants/url'
import { getToken } from '@/utils/secureStore'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = await getToken('token')
  if (token) {
    const clean = String(token).replace(/"/g, '')
    config.headers.Authorization = `Bearer ${clean}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export default api
