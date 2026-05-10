import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { CustomHeader } from '@/components/custom-header'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
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
    </Stack>
  )
}

export default ProfileLayout
