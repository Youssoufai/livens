import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { CustomHeader } from '@/components/custom-header'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
import { COLORS } from '@/constants/theme'

const styles = StyleSheet.create({
  routeHeader: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
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
              title={props.route.name}
              containerStyle={styles.routeHeader}
              showBack
            />
          )
        },
      }}
    ></Stack>
  )
}

export default ProfileLayout
