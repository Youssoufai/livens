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
  scrollEnabled,
}: {
  children: ReactNode
  horizontal?: boolean
  style?: StyleProp<ViewStyle>
} & Pick<ScrollViewProps, 'refreshControl' | 'scrollEnabled'>) => {
  return (
    <RNScrollView
      contentContainerStyle={[{ flexGrow: 1 }, style]}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      refreshControl={refreshControl}
      scrollEnabled={scrollEnabled}
    >
      {children}
    </RNScrollView>
  )
}

export default ScrollView
