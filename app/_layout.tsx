import { Stack, useSegments } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import * as WebBrowser from 'expo-web-browser'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { PaperProvider } from 'react-native-paper'
// ✅ OneSignal imports
import { LogLevel, OneSignal } from 'react-native-onesignal'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Toaster } from 'sonner-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { StyleSheet, View } from 'react-native'

import { toastOptions } from '@/components/notification'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 2000,
  fade: true,
})

// import { RequestProvider } from './context/requestContext'

// WebBrowser.maybeCompleteAuthSession()

// const tokenCache = {
//   async getToken(key) {
//     return SecureStore.getItemAsync(key)
//   },
//   async saveToken(key, value) {
//     return SecureStore.setItemAsync(key, value)
//   },
// }

GoogleSignin.configure({
  webClientId:
    '850951594746-b7co332s3k0mk9lngdj7n2h53rqerp0l.apps.googleusercontent.com',
  iosClientId:
    '850951594746-obmitsnsu02semv5itrg90la46peq9ee.apps.googleusercontent.com',
  // offlineAccess: true, // 👈 REQUIRED for idToken consistency
})

const lightStatusRoutes = ['']

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const InitialLayout = () => {
  const [fontLoaded] = useFonts({
    dmSansRegular: require('@/assets/fonts/DM_Sans/DMSans-Regular.ttf'),
    dmSansMedium: require('@/assets/fonts/DM_Sans/DMSans-Medium.ttf'),
    dmSansSemiBold: require('@/assets/fonts/DM_Sans/DMSans-SemiBold.ttf'),
    dmSansBold: require('@/assets/fonts/DM_Sans/DMSans-Bold.ttf'),
  })

  const [appIsReady, setAppIsReady] = useState(false)

  const segments = useSegments() as string[]
  const pathname = segments.join('/')

  const isReady = appIsReady && fontLoaded

  useEffect(() => {
    const init = async () => {
      OneSignal.Debug.setLogLevel(LogLevel.Verbose)

      await OneSignal.initialize('ab35b02e-e56d-4e83-86ca-ca3ad162e87a')

      await OneSignal.Notifications.requestPermission(false)
    }

    init()
  }, [])

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2500))
      } catch (err) {
        console.warn(err)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync()
    }
  }, [isReady])

  if (!isReady) {
    return null
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar
        style={lightStatusRoutes.includes(pathname) ? 'light' : 'dark'}
      />
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" />
      </Stack>
    </View>
  )
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <PaperProvider>
          <KeyboardProvider>
            {/*<RequestProvider> */}
            <InitialLayout />
            <Toaster toastOptions={toastOptions} />
            {/*  </RequestProvider> */}
          </KeyboardProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
