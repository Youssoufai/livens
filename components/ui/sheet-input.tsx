import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import React, { useState } from 'react'
import { useController } from 'react-hook-form'
import { StyleSheet, TextInputProps, View } from 'react-native'

import { FONTS } from '@/constants/fonts'
import { COLORS } from '@/constants/theme'
import { actuateFontSize } from '@/utils/normalize'

import Text from '../text'
import { type InputPropType } from './ui.types'

type SheetInputProps = InputPropType & Omit<TextInputProps, 'error'>

const SheetInput = ({
  control,
  defaultValue,
  value,
  name,
  placeholder,
  label,
  addBottomPadding = true,
  onBlur,
  onChangeText,
  formatter,
  error,
  hasFormError,
  style,
  containerStyle,
  labelStyle,
  inputFieldStyle,
  ...props
}: SheetInputProps) => {
  const isRHFControlled = !!control && !!name

  const controller = isRHFControlled
    ? useController({ control, name, defaultValue })
    : null

  const [isFocused, setIsFocused] = useState(false)

  const hasErrors = !!error

  const inputValue = isRHFControlled ? controller?.field.value : value

  const handleTextChange = (val: string) => {
    let formattedValue = val

    if (formatter) {
      formattedValue = formatter(formattedValue)
    }

    if (isRHFControlled) {
      controller?.field.onChange(formattedValue)
    } else {
      onChangeText?.(formattedValue)
    }
  }

  const borderColor = hasFormError
    ? COLORS.danger
    : isFocused
      ? COLORS.grey[500]
      : COLORS.grey[100]

  return (
    <View
      style={[styles.container, { paddingBottom: addBottomPadding ? 12 : 0 }]}
    >
      <View style={[styles.inputFieldWrapper, inputFieldStyle]}>
        {label && (
          <Text
            size={14}
            lineHeight={20}
            weight={600}
            color="grey-500"
            style={labelStyle}
          >
            {label}
          </Text>
        )}

        <View style={[styles.inputContainer, { borderColor }, containerStyle]}>
          <BottomSheetTextInput
            value={inputValue}
            onChangeText={handleTextChange}
            onBlur={(e) => {
              setIsFocused(false)
              if (isRHFControlled) {
                controller?.field.onBlur()
              } else {
                onBlur?.(e)
              }
            }}
            defaultValue={isRHFControlled ? undefined : defaultValue}
            placeholder={placeholder}
            placeholderTextColor={COLORS.grey[300]}
            style={[styles.input, style]}
            onFocus={() => setIsFocused(true)}
            {...props}
          />
        </View>
      </View>
      {hasErrors && (
        <View
          style={[
            styles.errorWrapper,
            !addBottomPadding && styles.errorBottomExtra,
          ]}
        >
          <Text size={10} weight={500} color="danger">
            {error}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  inputFieldWrapper: {
    rowGap: 4,
  },
  inputContainer: {
    height: 52,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  input: {
    fontFamily: FONTS.dm_sans[500],
    fontSize: actuateFontSize(16),
    color: COLORS.grey[500],
    paddingVertical: 0,
  },
  errorWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: 4,
  },
  errorBottomExtra: {
    bottom: -10,
  },
})

export default SheetInput
