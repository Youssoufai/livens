import { useEffect } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

import { COLORS } from '@/constants/theme'

import { SkeletonLoaderProps } from './components.types'

export const SkeletonLoader = ({
  children,
  height,
  isLoading = true,
  style,
}: SkeletonLoaderProps) => {
  const { width } = useWindowDimensions()

  const translateX = useSharedValue(-width)

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration: 2000 }),
      -1,
      false
    )
  }, [width])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  if (!isLoading) return children

  return (
    <View style={[styles.wrapper, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          { height, width: width * 0.4 }, // narrower moving block
          animatedStyle,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: COLORS.grey[100],
    overflow: 'hidden',
  },
  shimmerWrapper: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
  },
  shimmer: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.grey[50],
    opacity: 0.7,
  },
})
