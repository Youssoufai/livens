import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { CustomHeader } from '@/components/custom-header'
import { COLORS } from '@/constants/theme'
import { FONTS } from '@/constants/fonts'

const styles = StyleSheet.create({
  routeHeader: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
  screenTitle: {
    fontFamily: FONTS.dm_sans[600],
  },
})

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        header(props) {
          return (
            <CustomHeader
              title={props.options.title}
              containerStyle={styles.routeHeader}
              titleStyle={styles.screenTitle}
              showBack
            />
          )
        },
      }}
    >
      <Stack.Screen name="fund-wallet" options={{ title: 'Fund wallet' }} />
      <Stack.Screen name="edit" options={{ title: 'Edit profile' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Stack.Screen
        name="password-and-security"
        options={{ title: 'Change Password' }}
      />
      <Stack.Screen name="withdraw" options={{ title: 'Withdraw' }} />
      <Stack.Screen
        name="transaction-history"
        options={{ title: 'Transaction history' }}
      />
      <Stack.Screen name="support" options={{ title: 'Help & support' }} />
      <Stack.Screen name="faqs" options={{ title: 'FAQs' }} />
      <Stack.Screen name="contact" options={{ title: 'About' }} />
      <Stack.Screen
        name="update-location"
        options={{ title: 'Update location' }}
      />
      <Stack.Screen
        name="delete-account"
        options={{ title: 'Delete account' }}
      />
      <Stack.Screen name="refer" options={{ title: 'Refer & Earn' }} />
    </Stack>
  )
}

export default ProfileLayout
