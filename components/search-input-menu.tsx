import { useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { Portal, TextInput } from 'react-native-paper'

import SearchIcon from '@/components/icons/search'
import Text from '@/components/text'
import Input from '@/components/ui/input'
import { COLORS } from '@/constants/theme'
import { FONTS } from '@/constants/fonts'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'

import { SearchInputProps } from './components.types'
import Animated, { useSharedValue } from 'react-native-reanimated'

const DROPDOWN_BOTTOM_MARGIN = 16

interface InputMeasure {
  x: number
  y: number
  width: number
  height: number
}

export default function SearchInput({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search a place...',
  suggestions = [],
  onSelectSuggestion,
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [inputMeasure, setInputMeasure] = useState<InputMeasure>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })

  const dropdownOpacity = useSharedValue(0)

  const inputRef = useRef<View>(null)

  const hasText = value.length > 0
  const showDropdown = isFocused && hasText && suggestions.length > 0

  const screenHeight = Dimensions.get('window').height
  const dropdownTop = inputMeasure.y + inputMeasure.height
  const maxDropdownHeight = Math.max(
    screenHeight - dropdownTop - DROPDOWN_BOTTOM_MARGIN,
    80
  )

  useEffect(() => {}, [])

  const measureInput = () => {
    inputRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setInputMeasure({ x: pageX, y: pageY, width, height })
    })
  }

  const handleFocus = () => {
    measureInput()
    setIsFocused(true)
  }

  const handleClose = () => setIsFocused(false)

  const handleSuggestionPress = (item: string) => {
    onSelectSuggestion?.(item)
    handleClose()
  }

  const leftIcon = hasText ? (
    <TextInput.Icon
      icon={() => <SearchIcon fill={COLORS.grey[400]} width={20} height={20} />}
      forceTextInputFocus={false}
    />
  ) : undefined

  const rightIcon = hasText ? (
    <TextInput.Icon
      icon="close"
      color={COLORS.grey[400]}
      size={20}
      onPress={onClear}
      forceTextInputFocus={false}
    />
  ) : (
    <TextInput.Icon
      icon={() => <SearchIcon fill={COLORS.grey[300]} width={20} height={20} />}
      forceTextInputFocus={false}
    />
  )

  return (
    <View ref={inputRef} onLayout={measureInput}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        addBottomPadding={false}
        left={leftIcon}
        right={rightIcon}
        onFocus={handleFocus}
        containerStyle={styles.inputContainer}
        outlineStyle={[styles.inputOutline, isFocused && styles.focused]}
        style={styles.input}
      />
      {showDropdown && (
        <Portal>
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose} />
          <Animated.ScrollView
            style={[
              styles.dropdown,
              {
                top: dropdownTop + 6,
                left: inputMeasure.x,
                width: inputMeasure.width,
                maxHeight: maxDropdownHeight - 6,
              },
            ]}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {suggestions.map((item, index) => (
              <Pressable
                key={`${item}_${index}`}
                style={[
                  styles.dropdownItem,
                  index + 1 === suggestions.length && styles.noBorder,
                ]}
                onPress={() => handleSuggestionPress(item)}
              >
                <Text size={16} lineHeight={20} color="grey-600" weight={600}>
                  {item}
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
  input: {
    backgroundColor: '#F6F6F6',
  },
  inputOutline: {
    borderRadius: 30,
    borderWidth: 0,
  },
  focused: {
    borderWidth: 1,
  },
  inputContainer: {
    borderRadius: 4,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
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
