import { Eye } from 'lucide-react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

import { COLORS } from '@/constants/theme'
import VisibilityOffIcon from '@/assets/icons/visibility_off.svg'

import { PasswordInputProps } from './components.types'
import Input from './ui/input'

const ICON_SIZE = 24

const PasswordInput = ({
  name,
  control,
  label,
  placeholder,
  addPadding = true,
  error,
  hasFormError,
}: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <Input
      name={name}
      control={control}
      label={label}
      placeholder={placeholder}
      secureTextEntry={!isVisible}
      addBottomPadding={addPadding}
      hitSlop={10}
      error={error}
      hasFormError={hasFormError}
      right={
        <TextInput.Icon
          onPress={toggleVisibility}
          icon={() =>
            isVisible ? (
              <VisibilityOffIcon width={20} />
            ) : (
              <Eye
                strokeWidth={1.5}
                size={ICON_SIZE}
                fill={COLORS.grey[300]}
                color={COLORS.white}
              />
            )
          }
          containerColor={COLORS.grey[400]}
          style={styles.right}
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  right: {
    backgroundColor: 'transparent',
  },
})

export default PasswordInput
