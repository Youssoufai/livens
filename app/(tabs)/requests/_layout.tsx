import { Stack } from 'expo-router'
import { Pressable, StyleSheet } from 'react-native'
import { Ellipsis } from 'lucide-react-native'

import { CustomHeader } from '@/components/custom-header'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
import { FONTS } from '@/constants/fonts'
import { COLORS } from '@/constants/theme'

const styles = StyleSheet.create({
  requestTitle: {
    fontSize: actuateFontSize(28),
    lineHeight: actuateLineHeight(28, 32),
    fontFamily: FONTS.dm_sans[700],
    color: COLORS.black,
  },
})

export default function RequestsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // hide headers across all nested screens
        animation: 'slide_from_right', // smooth transitions between screens
      }}
    ></Stack>
  )
}
