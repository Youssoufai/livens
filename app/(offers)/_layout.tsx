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

const OffersLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen
        name="sent"
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

export default OffersLayout
