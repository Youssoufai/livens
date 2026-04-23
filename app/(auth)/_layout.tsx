import React from 'react'
import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { CustomHeader } from '@/components/custom-header'
import { COLORS } from '@/constants/theme'

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
  headerContent: {
    height: 52,
  },
})

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="create-account"
        options={{
          headerShown: true,
          header() {
            return <CustomHeader showBack />
          },
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          header(props) {
            return <CustomHeader showBack />
          },
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerShown: true,
          header(props) {
            return (
              <CustomHeader
                containerStyle={styles.headerContainer}
                contentStyle={styles.headerContent}
                showBack
              />
            )
          },
        }}
      />
      <Stack.Screen
        name="verify-reset-otp"
        options={{
          headerShown: true,
          header(props) {
            return (
              <CustomHeader
                containerStyle={styles.headerContainer}
                contentStyle={styles.headerContent}
                showBack
              />
            )
          },
        }}
      />
      <Stack.Screen
        name="reset-password"
        options={{
          headerShown: true,
          header(props) {
            return (
              <CustomHeader
                containerStyle={styles.headerContainer}
                contentStyle={styles.headerContent}
                showBack
              />
            )
          },
        }}
      />
    </Stack>
  )
}

export default AuthLayout
