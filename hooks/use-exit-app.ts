import { useFocusEffect } from 'expo-router'
import { useRef } from 'react'
import { BackHandler } from 'react-native'

import AppStorage from '@/utils/storage'
import { useBoundStore } from '@/state'
import { STORE_KEYS } from '@/constants'

export default function useExitApp() {
  const storage = useRef(new AppStorage()).current
  const token = storage.getItem(STORE_KEYS.token)
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated)

  const isInSession = isAuthenticated || !!token
  useFocusEffect(() => {
    const onBackPress = () => {
      if (isInSession) {
        BackHandler.exitApp()
        return true
      }
      return false
    }

    const subscribed = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    )

    return () => subscribed.remove()
  })
}
