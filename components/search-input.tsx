import { forwardRef, useRef, useState } from 'react'
import { StyleSheet, TextInput as RNTextInput } from 'react-native'
import { Portal, TextInput } from 'react-native-paper'

import SearchIcon from '@/components/icons/search'
import Input from '@/components/ui/input'
import { COLORS } from '@/constants/theme'

import { SearchInputProps } from './components.types'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'

const DROPDOWN_BOTTOM_MARGIN = 16

const SearchInput = forwardRef<RNTextInput, SearchInputProps>(
  (
    { value, placeholder = 'Search a place...', onChangeText, onClear },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const hasText = value.length > 0

    const leftIcon = hasText ? (
      <TextInput.Icon
        icon={() => (
          <SearchIcon fill={COLORS.grey[400]} width={20} height={20} />
        )}
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
        icon={() => (
          <SearchIcon fill={COLORS.grey[300]} width={20} height={20} />
        )}
        forceTextInputFocus={false}
      />
    )

    return (
      <Input
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        addBottomPadding={false}
        left={leftIcon}
        right={rightIcon}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        containerStyle={styles.inputContainer}
        outlineStyle={[styles.inputOutline, isFocused && styles.focused]}
        style={styles.input}
      />
    )
  }
)

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F6F6F6',
    fontSize: actuateFontSize(14),
    lineHeight: actuateLineHeight(20),
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

export default SearchInput
