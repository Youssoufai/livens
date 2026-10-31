import { useFocusEffect } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

import { checkActivityPresence } from '@/services/profile'

export function useAppActivity(): AppStateStatus {
  const [appStateVisible, setAppStateVisible] = useState(AppState.currentState)
  const appState = useRef(AppState.currentState)

  const updatePresence = useCallback((nextAppState: AppStateStatus) => {
    void checkActivityPresence(nextAppState === 'active').catch(() => undefined)
  }, [])

  useFocusEffect(
    useCallback(() => {
      const currentAppState = AppState.currentState
      appState.current = currentAppState
      setAppStateVisible(currentAppState)
      updatePresence(currentAppState)

      const subscription = AppState.addEventListener(
        'change',
        (nextAppState: AppStateStatus) => {
          if (appState.current === nextAppState) return

          appState.current = nextAppState
          setAppStateVisible(nextAppState)
          updatePresence(nextAppState)
        }
      )

      return () => subscription.remove()
    }, [updatePresence])
  )

  return appStateVisible
}
