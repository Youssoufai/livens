import { Stack } from 'expo-router'

import { CustomHeader } from '@/components/custom-header'
import { COLORS } from '@/constants/theme'
import { globalStyles } from '@/styles/globalStyles'

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
              containerStyle={globalStyles.screenHeaderContainer}
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
              containerStyle={globalStyles.screenHeaderContainer}
            />
          ),
        }}
      />
      <Stack.Screen
        name="browse-request-details"
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              showBack
              containerStyle={globalStyles.screenHeaderContainer}
            />
          ),
        }}
      />
      <Stack.Screen
        name="outgoing-details"
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              title="Request details"
              showBack
              containerStyle={globalStyles.screenHeaderContainer}
            />
          ),
        }}
      />
      <Stack.Screen
        name="capture-process"
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              // showBack
              containerStyle={globalStyles.screenHeaderContainer}
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
              containerStyle={globalStyles.screenHeaderContainer}
            />
          ),
        }}
      />
    </Stack>
  )
}

export default RequestLayout
