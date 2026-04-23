import type { PropsWithChildren, ReactElement } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated'

import KeyboardScrollView from './keyboard-scrollview'

const HEADER_HEIGHT = 144

type Props = PropsWithChildren<{
  headerImage: ReactElement
  backgroundColor: string
  headerBackgroundColor?: string
  contentBackgroundColor?: string
  headerheight?: number
  headerStyle?: ViewStyle
  contentStyle?: StyleProp<ViewStyle>
}>

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  headerheight = HEADER_HEIGHT,
  backgroundColor,
  contentBackgroundColor,
  headerStyle,
  contentStyle,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollOffset(scrollRef)
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerheight, 0, headerheight],
            [-headerheight / 2, 0, headerheight * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-headerheight, 0, headerheight],
            [2, 1, 1]
          ),
        },
      ],
    }
  })

  return (
    <KeyboardScrollView style={{ backgroundColor }}>
      <Animated.ScrollView
        ref={scrollRef}
        style={{ backgroundColor, flex: 1, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor, height: headerheight },
            headerStyle,
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <View
          style={[
            styles.content,
            { backgroundColor: contentBackgroundColor },
            contentStyle,
          ]}
        >
          {children}
        </View>
      </Animated.ScrollView>
    </KeyboardScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  content: {
    // flex: 1,
    paddingTop: 24,
    gap: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
})
