import { ReactNode } from 'react'
import {
  ScrollView as RNScrollView,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native'

const ScrollView = ({
  children,
  horizontal,
  style,
  refreshControl,
}: {
  children: ReactNode
  horizontal?: boolean
  style?: StyleProp<ViewStyle>
} & Pick<ScrollViewProps, 'refreshControl'>) => {
  return (
    <RNScrollView
      contentContainerStyle={[{ flexGrow: 1 }, style]}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      refreshControl={refreshControl}
    >
      {children}
    </RNScrollView>
  )
}

export default ScrollView
