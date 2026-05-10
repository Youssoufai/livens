import { ReactElement, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import { Portal } from 'react-native-paper'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { COLORS } from '@/constants/theme'
import { DROPDOWN_BOTTOM_MARGIN } from '@/constants'

import Text from './text'
import { InputMeasure } from './components.types'

const Dropdown = ({
  isVisible,
  anchor,
  options,
  onSelectOption,
  style,
}: {
  isVisible?: boolean
  anchor: ReactElement
  options: ListItem[]
  onSelectOption?: (value: string) => void
  style?: ViewStyle
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [inputMeasure, setInputMeasure] = useState<InputMeasure>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const anchorRef = useRef<View>(null)
  const dropdownOpacity = useSharedValue(0)

  const screenHeight = Dimensions.get('window').height
  const dropdownTop = inputMeasure.y + inputMeasure.height
  const maxDropdownHeight = Math.max(
    screenHeight - dropdownTop - DROPDOWN_BOTTOM_MARGIN,
    80
  )

  const open = showDropdown || isVisible

  useEffect(() => {
    dropdownOpacity.value = withTiming(open ? 1 : 0, {
      duration: 250,
      easing: Easing.sin,
    })
  }, [open])

  const handleClose = () => setShowDropdown(false)

  const handleAnchorPress = () => {
    if (showDropdown) {
      handleClose()
      return
    }
    anchorRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setInputMeasure({ x: pageX, y: pageY, width, height })
      setShowDropdown(true)
    })
  }

  const handleSuggestionPress = (item: string) => {
    onSelectOption?.(item)
    handleClose()
  }

  const dropdownStyle = useAnimatedStyle(() => ({
    opacity: dropdownOpacity.value,
  }))

  return (
    <View style={style}>
      <Pressable ref={anchorRef} onPress={handleAnchorPress}>
        <View pointerEvents="none">{anchor}</View>
      </Pressable>
      {open && (
        <Portal>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
          <Animated.ScrollView
            style={[
              styles.dropdown,
              {
                top: dropdownTop - 10,
                left: inputMeasure.x,
                width: inputMeasure.width,
                maxHeight: maxDropdownHeight - 6,
              },
              dropdownStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {options.map((item, index) => (
              <Pressable
                key={`${item}_${index}`}
                style={[
                  styles.dropdownItem,
                  index + 1 === options.length && styles.noBorder,
                ]}
                onPress={() => handleSuggestionPress(item.value.toString())}
              >
                <Text size={16} lineHeight={20} color="grey-600" weight={600}>
                  {item.value}
                </Text>
              </Pressable>
            ))}
          </Animated.ScrollView>
        </Portal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grey[50],
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
  noBorder: {
    borderBottomWidth: 0,
  },
})

export default Dropdown
