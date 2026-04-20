import { Stack, useSegments } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import * as WebBrowser from 'expo-web-browser'
import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { PaperProvider } from 'react-native-paper'
// ✅ OneSignal imports
import { LogLevel, OneSignal } from 'react-native-onesignal'
import { SafeAreaProvider } from 'react-native-safe-area-context'

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

const lightStatusRoutes = ['']

const InitialLayout = () => {
  const [fontLoaded] = useFonts({
    dmSansRegular: require('@/assets/fonts/DM_Sans/DMSans-Regular.ttf'),
    dmSansMedium: require('@/assets/fonts/DM_Sans/DMSans-Medium.ttf'),
    dmSansSemiBold: require('@/assets/fonts/DM_Sans/DMSans-SemiBold.ttf'),
    dmSansBold: require('@/assets/fonts/DM_Sans/DMSans-Bold.ttf'),
  })

  const segments = useSegments() as string[]
  const pathname = segments.join('/')

  useEffect(() => {
    const init = async () => {
      OneSignal.Debug.setLogLevel(LogLevel.Verbose)

      await OneSignal.initialize('ab35b02e-e56d-4e83-86ca-ca3ad162e87a')

      await OneSignal.Notifications.requestPermission(false)
    }

    init()
  }, [])

  if (!fontLoaded) return null

  return (
    <>
      <StatusBar
        style={lightStatusRoutes.includes(pathname) ? 'light' : 'dark'}
      />
      <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" />
      </Stack>
    </>
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

            {/*  </RequestProvider> */}
          </KeyboardProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
