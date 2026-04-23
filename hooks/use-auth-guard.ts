import { useRouter } from 'expo-router'
import { useLayoutEffect, useRef, useState } from 'react'

import { useBoundStore } from '@/state'
import AppStorage from '@/utils/storage'
import { STORE_KEYS } from '@/constants'

export function useAuthGuard() {
  const [loading, setLoading] = useState(false)

  const storage = useRef(new AppStorage()).current

  const isAuthenticated = useBoundStore((state) => state.isAuthenticated)

  const router = useRouter()

  const clearUserPresence = async () => {
    try {
      storage.removeItem(STORE_KEYS.token)
      storage.removeItem(STORE_KEYS.userId)

      return true
    } catch (err) {
      return false
    }
  }

  async function checkUserPresence() {
    setLoading(true)
    try {
      const token = storage.getItem(STORE_KEYS.token)

      if (!token) {
        await clearUserPresence()

        throw Error('Invalid token')
      }

      if (!isAuthenticated) {
        throw Error('User not authenticated')
      }
    } catch (error) {
      router.replace('/login')
    } finally {
      setLoading(false)
    }
  }

  useLayoutEffect(() => {
    checkUserPresence()
  }, [])

  return loading
}
