import React, { useState } from 'react'
import { useController } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { TextInput, type TextInputProps } from 'react-native-paper'

import { FONTS } from '@/constants/fonts'
import { COLORS } from '@/constants/theme'
import { actuateFontSize } from '@/utils/normalize'

import Text from '../text'
import InputLabel from './input_label'
import { type InputPropType } from './ui.types'

type PrimaryInputProps = InputPropType & Omit<TextInputProps, 'error'>

const Input = ({
  type = 'paper',
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
  ...props
}: PrimaryInputProps) => {
  const isRHFControlled = !!control && !!name

  const controller = isRHFControlled
    ? useController({ control, name, defaultValue })
    : null

  const [isFocused, setIsFocused] = useState(false)

  const hasErrors = !!error

  const inputValue = isRHFControlled ? controller?.field.value : value

  const handleTextChange = (value: string) => {
    let formattedValue = value

    if (formatter) {
      formattedValue = formatter(formattedValue)
    }

    if (isRHFControlled) {
      controller?.field.onChange(formattedValue)
    } else {
      onChangeText?.(formattedValue)
    }
  }

  return (
    <View
      style={[styles.container, { paddingBottom: addBottomPadding ? 12 : 0 }]}
    >
      <View style={styles.inputFieldWrapper}>
        {label && (
          <Text size={14} lineHeight={20} weight={600} color="grey-500">
            {label}
          </Text>
        )}

        <View style={[styles.inputContainer, containerStyle]}>
          <TextInput
            mode="outlined"
            value={inputValue}
            onChangeText={handleTextChange}
            onBlur={isRHFControlled ? controller?.field.onBlur : onBlur}
            label=""
            placeholder={placeholder}
            textColor={COLORS.grey[500]}
            placeholderTextColor={COLORS.grey[300]}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            style={[styles.input, style]}
            outlineStyle={styles.outlined}
            activeOutlineColor={COLORS.grey[500]}
            outlineColor={hasFormError ? COLORS.danger : COLORS.grey[100]}
            onFocus={() => setIsFocused(true)}
            onEndEditing={() => setIsFocused(false)}
            theme={{
              fonts: {
                bodyLarge: {
                  fontFamily: FONTS.dm_sans[400],
                },
                labelLarge: {
                  fontFamily: FONTS.dm_sans[700],
                },
              },
              colors: {
                onSurfaceVariant: hasFormError
                  ? COLORS.danger
                  : controller?.field.value || value
                    ? COLORS.primary[500]
                    : '#8C8C8C',
              },
            }}
            {...props}
          />
        </View>
      </View>
      {hasErrors && (
        <View style={styles.errorWrapper}>
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
  input: {
    fontFamily: FONTS.dm_sans[500],
    fontSize: actuateFontSize(16),
    backgroundColor: '#ffffff',
    height: 52,
    paddingHorizontal: 3,
  },
  outlined: {
    borderWidth: 1,
    borderRadius: 4,
  },
  inputFieldWrapper: {
    rowGap: 4,
  },
  inputContainer: {
    // overflow: "hidden",
    // borderRadius: 30,
  },
  underline: {
    borderWidth: 0,
    outlineWidth: 0,
  },
  errorWrapper: {
    position: 'absolute',
    bottom: 0.5,
    left: 0,
    paddingLeft: 10,
  },
  errorInput: {
    borderColor: COLORS.danger,
  },
  errorLabel: {
    color: COLORS.danger,
  },
})

export default Input
