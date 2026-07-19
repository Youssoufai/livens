import { useEffect } from 'react'
import {
  LogLevel,
  NotificationClickEvent,
  NotificationWillDisplayEvent,
  OneSignal,
} from 'react-native-onesignal'
import { router } from 'expo-router'
import { useBoundStore } from '@/state'

type NotificationData = {
  screen: string
  conversation_id?: string
  request_id?: string
  receiver?: string
}

function handleNotificationNavigation(data: NotificationData) {
  if (!data) return

  if (data.screen === 'chat' && data.conversation_id && data.receiver) {
    router.push({
      pathname: '/(requests)/chat',
      params: {
        conversationId: data.conversation_id,
        requestId: data.request_id,
        receiverId: data.receiver,
      },
    })
  } else if (data.screen === 'RequestDetails' && data.request_id) {
    router.push({
      pathname: '/(requests)/request-details',
      params: { id: data.request_id },
    })
  } else if (data.screen === 'browse_request') {
    router.push({
      pathname: '/(requests)/browse-request-details',
      params: { id: data.request_id },
    })
  } else if (data.screen === 'ongoing_request' && data.request_id) {
    router.push({
      pathname: '/(requests)/outgoing-details',
      params: { id: data.request_id },
    })
  } else {
    router.push({
      pathname: '/(tabs)/home',
    })
  }
}

export default function useOneSignalPushNotification() {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose)

    OneSignal.initialize(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID ?? '')

    OneSignal.Notifications.requestPermission(true)

    const handleClick = async (event: NotificationClickEvent) => {
      const data = event.notification.additionalData as
        | NotificationData
        | undefined

      const { user, getUser } = useBoundStore.getState()
      if (!user) {
        try {
          await getUser()
        } catch {
          return
        }
      }

      if (data?.screen) {
        handleNotificationNavigation(data)
      }
    }

    const handleForegroundDisplay = (event: NotificationWillDisplayEvent) => {
      event.getNotification().display()
    }

    OneSignal.Notifications.addEventListener('click', handleClick)
    OneSignal.Notifications.addEventListener(
      'foregroundWillDisplay',
      handleForegroundDisplay
    )

    return () => {
      OneSignal.Notifications.removeEventListener('click', handleClick)
      OneSignal.Notifications.removeEventListener(
        'foregroundWillDisplay',
        handleForegroundDisplay
      )
    }
  }, [])
}
