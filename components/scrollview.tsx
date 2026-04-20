import { ReactNode } from 'react'
import { ScrollView as RNScrollView, ViewStyle } from 'react-native'

const ScrollView = ({
  children,
  style,
}: {
  children: ReactNode
  style?: ViewStyle
}) => {
  return (
    <RNScrollView
      contentContainerStyle={[{ flexGrow: 1 }, style]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </RNScrollView>
  )
}

export default ScrollView
