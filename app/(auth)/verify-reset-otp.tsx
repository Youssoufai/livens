import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { useLayoutEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'

import { ThemedView } from '@/components/themed-view'
import { CustomHeader } from '@/components/custom-header'
import AuthHeader from '@/modules/auth/components/auth-header'
import OtpEntry from '@/components/otp-input'
import Button from '@/components/ui/button'
import Text from '@/components/text'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { API } from '@/services'
import { API_ENDPOINTS } from '@/constants/endpoints'
import ResetTimer from '@/modules/auth/components/reset-timer'

export default function VerifyResetOtpScreen() {
  const router = useRouter()
  const navigation = useNavigation()
  const { email } = useLocalSearchParams<{ email: string }>()

  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleResend = async (): Promise<undefined> => {
    try {
      await API.post(API_ENDPOINTS.auth.forgot_password, { email })
    } catch (error) {
      showToastMessage(
        catchErr(error).message || 'Failed to resend code',
        'error'
      )
    }
  }

  const handleVerify = async () => {
    try {
      setIsLoading(true)
      await API.post(API_ENDPOINTS.auth.confirm_otp, { email, token: code })
      router.push({
        pathname: '/(auth)/reset-password',
        params: { email },
      })
    } catch (error) {
      showToastMessage(catchErr(error).message || 'Invalid code', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ThemedView hasBottomPadding style={styles.container}>
      <View style={styles.content}>
        <AuthHeader
          title="Verify your email"
          description={
            <>
              Enter the code sent to{' '}
              <Text size={16} lineHeight={20} weight={600} color="grey-500">
                {email}
              </Text>
            </>
          }
        />
        <View style={styles.otp}>
          <OtpEntry type="alphanumeric" onFilled={setCode} />
          <ResetTimer value={email} onResend={handleResend} />
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          label="Verify email"
          disabled={!code || code.length < 6}
          loading={isLoading}
          onPress={handleVerify}
        />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  content: {
    flex: 1,
    rowGap: 24,
  },
  otp: {
    rowGap: 24,
  },
  footer: {
    paddingBottom: 16,
  },
})
