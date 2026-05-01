import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import {
  isValidElement,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Portal } from 'react-native-paper'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { DROPDOWN_BOTTOM_MARGIN } from '@/constants'
import { COLORS } from '@/constants/theme'
import ArrowIcon from '@/assets/icons/triangle.svg'

import { InputMeasure, TooltipProps } from './components.types'
import Text from './text'

const Tooltip = ({ children, content }: PropsWithChildren<TooltipProps>) => {
  const [visible, setVisible] = useState(false)
  const [tooltipMeasure, setTooltipMeasure] = useState<InputMeasure>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const triggerRef = useRef<View>(null)
  const tooltipOPacity = useSharedValue(0)

  const tooltipTop = tooltipMeasure.y + tooltipMeasure.height
  const triggerCenterX = tooltipMeasure.x + tooltipMeasure.width / 2
  const tooltipLeft = triggerCenterX - 234 / 2

  useEffect(() => {
    tooltipOPacity.value = withTiming(visible ? 1 : 0, {
      duration: 250,
      easing: Easing.sin,
    })
  }, [visible])

  const handleTooltip = () => {
    if (visible) {
      setVisible(false)
      return
    }

    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTooltipMeasure({ x: pageX, y: pageY, width, height })
      setVisible(true)
    })
  }

  const contentStyle = useAnimatedStyle(() => ({
    opacity: tooltipOPacity.value,
  }))

  return (
    <>
      <Pressable
        ref={triggerRef}
        style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
        onPress={handleTooltip}
      >
        {children}
      </Pressable>

      {visible && (
        <Portal>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setVisible(false)}
          />
          <Animated.View
            style={[
              styles.tooltipBox,
              {
                top: tooltipTop,
                left: tooltipLeft,
              },
              contentStyle,
            ]}
          >
            <ArrowIcon style={styles.arrow} />
            <View style={styles.infoContent}>
              {typeof content === 'string' ? (
                <Text size={12} lineHeight={16} color="grey-400">
                  {content}
                </Text>
              ) : (
                content
              )}
            </View>
          </Animated.View>
        </Portal>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipBox: {
    backgroundColor: 'transparent',
    width: 234,
  },
  arrow: {
    alignSelf: 'center',
  },
  infoContent: {
    backgroundColor: COLORS.grey[50],
    borderRadius: 4,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
})

export default Tooltip
