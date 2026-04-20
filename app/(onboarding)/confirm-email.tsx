import { router, useLocalSearchParams } from 'expo-router'
import { useRef, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import ProgressBar from '@/components/progress-bar'
import { BASE_URL } from '@/constants/url'
import { getToken } from '@/utils/secureStore'
import OtpEntry from '@/components/otp-input'
import { OTPCODE_LENGTH } from '@/constants'
import Button from '@/components/ui/button'

export default function ConfirmEmail() {
  const { email } = useLocalSearchParams()

  // Store OTP as array for stable updates
  const [verificationCode, setVerificationCode] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const nextStep = () => {
    setActiveIndex((prevIndex) => prevIndex + 1)
  }

  const handleFilledCode = (value: string) => {
    setVerificationCode(value)
  }

  const handleVerify = async () => {
    if (verificationCode.length < OTPCODE_LENGTH) {
      Alert.alert('Missing Code', 'Please enter the verification code.')
      return
    }
    if (!email) {
      Alert.alert('Missing Email', 'Email address not found.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, token: verificationCode }),
      })

      const data = await response.json()
      if (!response.ok)
        throw new Error(data.message || 'Invalid verification code')

      const authToken = await getToken('token')
      if (!authToken) {
        Alert.alert('Session expired', 'Please log in again.')
        router.replace('/login')
        return
      }

      Alert.alert('Success', 'Email verified successfully!')
      nextStep()
      router.push('/(onboarding)/location')
    } catch (err) {
      //   Alert.alert('Verification Failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  const progress = Math.round((activeIndex + 1 / 3) * 100)

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />

      <Text style={styles.title}>Confirm your email</Text>
      <Text style={styles.subtitle}>
        We’ve sent a verification code to{' '}
        <Text style={{ fontWeight: '700' }}>{email}</Text>
      </Text>

      <View style={styles.otpContainer}>
        <OtpEntry onFilled={handleFilledCode} />
      </View>

      <Button
        label="Verify email"
        onPress={handleVerify}
        disabled={verificationCode.length < OTPCODE_LENGTH}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 32,
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#111',
    backgroundColor: '#fafafa',
  },
  verifyButton: {
    backgroundColor: '#ddd',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
  },
  verifyButtonActive: { backgroundColor: 'red' },
  verifyButtonText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
  },
})
