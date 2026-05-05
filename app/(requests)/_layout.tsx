import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { CustomHeader } from '@/components/custom-header'
import { COLORS } from '@/constants/theme'

const styles = StyleSheet.create({
  screenHeaderContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
})

const RequestLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="create-request"
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              showBack
              containerStyle={styles.screenHeaderContainer}
            />
          ),
        }}
      />
      <Stack.Screen
        name="request-details"
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              showBack
              title="Request details"
              containerStyle={styles.screenHeaderContainer}
            />
          ),
        }}
      />
      <Stack.Screen
        name="uploaded-images"
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              showBack
              containerStyle={styles.screenHeaderContainer}
            />
          ),
        }}
      />
    </Stack>
  )
}

export default RequestLayout
