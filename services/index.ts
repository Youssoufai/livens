import axios from 'axios'
import { router } from 'expo-router'

import { API_ENDPOINTS } from '@/constants/endpoints'
import Appstorage from '@/utils/storage'
import { STORE_KEYS } from '@/constants'

const storage = new Appstorage()

export const baseURL = (() => {
  return process.env.EXPO_PUBLIC_API_BASEURL
})()

export const API = axios.create({
  baseURL: baseURL,
  headers: { 'content-type': 'application/json' },
})

export const AuthenticatedAPI = axios.create({
  baseURL: baseURL,
  headers: { 'content-type': 'application/json' },
  // timeout: 30000,
})

AuthenticatedAPI.interceptors.request.use(async (config) => {
  const storedToken = storage.getItem<'string'>(STORE_KEYS.token)

  if (storedToken) {
    config.headers.set(
      'Authorization',
      storedToken ? `Bearer ${storedToken}` : null
    )
  }
  return config
})

AuthenticatedAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const token = storage.getItem<'string'>(STORE_KEYS.token)

        if (!token) throw Error('No token found')

        // const newTokenData = await refreshCurrentToken(token.refreshToken);

        // if (!newTokenData?.accessToken) {
        //   return Promise.reject(error);
        // }

        // originalRequest.headers["Authorization"] =
        //   `Bearer ${newTokenData.accessToken}`;

        return AuthenticatedAPI(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        router.replace('/(auth)/login')
        return
      }
    }

    return Promise.reject(error)
  }
)

export const getChanges = (endpoint: string, lastPulledAt: number) =>
  AuthenticatedAPI.get(`${endpoint}?lastPulledAt=${lastPulledAt}`)

export function pushChanges<T>(endpoint: string, changes: T) {
  return AuthenticatedAPI.post(`${endpoint}/push`, changes)
}

// async function refreshCurrentToken(refreshToken: string) {
//   try {
//     const response = await API.post(API_ENDPOINTS.auth.refresh_token, {
//       refreshToken,
//     })
//     const data = response.data.data
//     // storage.storeValue(STORAGE_STORED_KEYS.token, data);
//     return response.data.data
//   } catch (error) {
//     return null
//   }
// }
