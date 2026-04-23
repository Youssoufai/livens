import { StyleSheet, Text, View } from 'react-native'
import { useRef, useState } from 'react'

import OtpEntry from '@/components/otp-input'
import Button from '@/components/ui/button'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'

import ResetTimer from './reset-timer'
import { API } from '@/services'
import { API_ENDPOINTS } from '@/constants/endpoints'
import AppStorage from '@/utils/storage'
import { STORE_KEYS } from '@/constants'

const VerifyEmailForm = ({
  email,
  onNext,
}: {
  email: string
  onNext: VoidFunction
}) => {
  const [code, setCode] = useState('')
  const [isVerifyLoading, setIsVerifyLoading] = useState(false)

  const storage = useRef(new AppStorage()).current

  const handleFilled = (value: string) => {
    setCode(value)
  }

  const handleResend = async (value: string): Promise<undefined> => {}

  const verifyEmail = async () => {
    try {
      setIsVerifyLoading(true)

      if (!code) {
        throw Error('Unauthorized access')
      }
      await API.post(API_ENDPOINTS.auth.verify_email, { email, token: code })

      onNext()
    } catch (error) {
      const errMsg = catchErr(error).message || ''
      showToastMessage(errMsg, 'error')
    } finally {
      setIsVerifyLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <OtpEntry type="alphanumeric" onFilled={handleFilled} />
        <ResetTimer value={email} onResend={handleResend} />
      </View>
      <Button
        label="Continue"
        disabled={!code}
        loading={isVerifyLoading}
        onPress={verifyEmail}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
  main: {
    flex: 1,
    rowGap: 24,
  },
})

export default VerifyEmailForm
