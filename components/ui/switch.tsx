import { memo, useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'

import { SwitchProps } from './ui.types'

const THUMB_SIZE = 24
const SWITCH_WIDTH = 55

const Switch = memo(
  ({ value, onValueChange, thumbColor, trackColor }: SwitchProps) => {
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0))

    useEffect(() => {
      Animated.timing(animatedValue.current, {
        toValue: value ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start()
    }, [value])

    const startPos = 4
    const endPos = SWITCH_WIDTH - THUMB_SIZE - startPos

    const translateX = animatedValue.current.interpolate({
      inputRange: [0, 1],
      outputRange: [startPos, endPos],
    })

    return (
      <Pressable
        style={[
          styles.switch,
          { backgroundColor: value ? trackColor : '#EBEBEC' },
        ]}
        onPress={() => {
          if (onValueChange) {
            onValueChange(!value)
          }
        }}
      >
        <View style={styles.innerContainer}>
          <Animated.View
            style={[
              styles.thumb,
              { backgroundColor: thumbColor },
              { transform: [{ translateX }] },
            ]}
          ></Animated.View>
        </View>
      </Pressable>
    )
  }
)

const styles = StyleSheet.create({
  switch: {
    height: 30,
    width: SWITCH_WIDTH,
    borderRadius: 30,
  },
  innerContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
  },
})

export default Switch
