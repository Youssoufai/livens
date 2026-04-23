import { useEffect, useMemo, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { OtpInput, Theme } from 'react-native-otp-entry'

import { OTPCODE_LENGTH } from '@/constants'
import { FONTS } from '@/constants/fonts'
import { COLORS } from '@/constants/theme'
import { actuateFontSize } from '@/utils/normalize'

import { OTPEntryProps } from './components.types'
// import ErrorBox from "./error-box";

export default function OtpEntry({
  inputNumber = OTPCODE_LENGTH,
  secureEntry,
  onChange,
  onFilled,
  type,
  error,
}: OTPEntryProps) {
  const otpRef = useRef(null)
  const [reset, setReset] = useState(0)
  const [erred, setErred] = useState(false)

  const theme: Theme = useMemo(
    () => ({
      ...styles,
      pinCodeContainerStyle: {
        ...styles.pinCodeContainerStyle,
        borderColor: erred ? COLORS.danger : COLORS.grey[100],
      },
      focusedPinCodeContainerStyle: {
        ...styles.focusedPinCodeContainerStyle,
        borderColor: erred ? COLORS.danger : COLORS.grey[400],
      },
    }),
    [erred]
  )

  useEffect(() => {
    setErred(!!error)
  }, [error])

  const handleTextChange = (value: string) => {
    onChange?.(value)

    if (erred) {
      setReset((preVal) => preVal + 1)
      setErred(false)
    }
  }

  return (
    <View style={contentStyle.container}>
      <OtpInput
        key={reset}
        numberOfDigits={inputNumber}
        ref={otpRef}
        textInputProps={{
          accessibilityLabel: 'One-Time Code',
        }}
        textProps={{ accessibilityRole: 'text' }}
        focusColor={COLORS.grey[400]}
        theme={theme}
        onTextChange={handleTextChange}
        onFilled={(text: string) => onFilled?.(text)}
        type={type}
        hideStick
        secureTextEntry={secureEntry}
      />
      {/* {erred ? (
        <ErrorBox
          error={error ?? "Wrong code entered! Please enter a valid OTP"}
        />
      ) : null} */}
    </View>
  )
}

const contentStyle = StyleSheet.create({
  container: {
    rowGap: 24,
  },
})

const styles = StyleSheet.create({
  pinCodeContainerStyle: {
    borderRadius: 4,
    backgroundColor: COLORS.white,
    height: 55,
    minWidth: 45,
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    flex: 1,
  },
  focusedPinCodeContainerStyle: {
    borderWidth: 1,
    borderColor: COLORS.grey[400],
  },
  filledPinCodeContainerStyle: {
    borderColor: COLORS.grey[400],
  },
  containerStyle: {
    borderWidth: 0,
    gap: 8,
    justifyContent: undefined,
    height: 45,
    paddingHorizontal: 9.5,
  },
  pinCodeTextStyle: {
    fontFamily: FONTS.dm_sans[500],
    fontSize: actuateFontSize(16),
    color: COLORS.grey[400],
  },
})
