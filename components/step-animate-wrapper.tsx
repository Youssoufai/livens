import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'

import { StepTransitionProps } from './components.types'

const { width } = Dimensions.get('window')

export default function StepTransition({
  children,
  direction,
}: PropsWithChildren<StepTransitionProps>) {
  const translateX = useSharedValue(direction === 'forward' ? width : -width)
  const opacity = useSharedValue(0)

  useEffect(() => {
    translateX.value = direction === 'forward' ? width : -width

    opacity.value = 0

    translateX.value = withTiming(0, { duration: 300 })
    opacity.value = withTiming(1, { duration: 300 })
  }, [direction])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
