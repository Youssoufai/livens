import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'

import { ThemedView } from '@/components/themed-view'
import AuthHeader from '@/modules/auth/components/auth-header'
import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { API } from '@/services'
import { API_ENDPOINTS } from '@/constants/endpoints'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const onSubmit = async () => {
    try {
      setIsSubmitting(true)
      await API.post(API_ENDPOINTS.auth.forgot_password, {
        email: email.trim(),
      })

      router.push({
        pathname: '/(auth)/verify-reset-otp',
        params: { email: email.trim() },
      })
    } catch (error) {
      showToastMessage(
        catchErr(error).message || 'Something went wrong',
        'error'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  return (
    <ThemedView hasBottomPadding style={styles.container}>
      <View style={styles.content}>
        <AuthHeader
          title="Forgot password?"
          description="Enter the email address you used to create your Livelens account. We will send a code to confirm it's you."
        />
        <View style={styles.form}>
          <Input
            value={email}
            name="email"
            label="Email address"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          label="Send reset code"
          onPress={onSubmit}
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
        />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 13,
  },
  content: {
    flex: 1,
    rowGap: 24,
  },
  form: {
    rowGap: 10,
  },
  footer: {
    paddingBottom: 16,
  },
})
