import { Platform, StyleSheet, Text, View } from 'react-native'
import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonType,
  AppleAuthenticationButtonStyle,
  AppleAuthenticationScope,
  signInAsync,
} from 'expo-apple-authentication'
import { useState } from 'react'

import AppleIcon from '@/assets/icons/apple.svg'

import { API } from '@/services'
import { actuateFontSize } from '@/utils/normalize'
import { FONTS } from '@/constants/fonts'
import { COLORS } from '@/constants/theme'
import { catchErr } from '@/utils/error-handlers'

import { AppleAuthButtonProps, AppleErrorType } from './components.types'
import { showToastMessage } from './notification'
import Button from './ui/button'

const AppleAuthButton = ({ type, onLogin }: AppleAuthButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  if (Platform.OS !== 'ios') return

  const handleAppleSignIn = async () => {
    try {
      setIsLoading(true)
      const credential = await signInAsync({
        requestedScopes: [
          AppleAuthenticationScope.FULL_NAME,
          AppleAuthenticationScope.EMAIL,
        ],
      })

      const payload = {
        identity_token: credential.identityToken,
        authorization_code: credential.authorizationCode,
        first_name: credential.fullName?.givenName || null,
        last_name: credential.fullName?.familyName || null,
      }

      const response = await API.post('/auth/apple', payload)

      const data = await response.data

      await onLogin(data.token, !!data?.user?.location)
    } catch (e) {
      const error = e as Error | AppleErrorType
      let errorMsg = ''

      if ('code' in error && error?.code === 'ERR_REQUEST_CANCELED') {
        errorMsg = 'User canceled sign-in'
      } else if ('message' in error) {
        errorMsg = catchErr(error).message ?? 'Something went wrong'
      } else {
        errorMsg = 'Something went wrong'
      }

      showToastMessage(errorMsg, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const buttonLabel =
    type === AppleAuthenticationButtonType.SIGN_UP
      ? 'Sign up with Apple'
      : type === AppleAuthenticationButtonType.SIGN_IN
        ? 'Sign in with Apple'
        : 'Continue with Apple'

  return (
    <Button
      label={buttonLabel}
      buttonColor="white"
      labelColor="grey-800"
      icon={<AppleIcon height={24} width={24} />}
      alignIcon="left"
      btnStyle={styles.buttonContainer}
      onPress={handleAppleSignIn}
      loading={isLoading}
    />
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    borderColor: COLORS.grey[100],
  },
  button: {
    fontSize: actuateFontSize(14),
    fontFamily: FONTS.dm_sans[500],
  },
})

export default AppleAuthButton
