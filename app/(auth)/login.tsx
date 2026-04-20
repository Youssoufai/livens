import AsyncStorage from '@react-native-async-storage/async-storage'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Google from 'expo-auth-session/providers/google'
import { makeRedirectUri } from 'expo-auth-session'
import { router } from 'expo-router'
import * as WebBrowser from 'expo-web-browser'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

import FormField from '@/components/form-field'
import PasswordField from '@/components/password-field'
import Button from '@/components/ui/button'
import Text from '@/components/text'
import api from '@/lib/api'
import { AuthResponse } from '@/models/auth'
import { loginSchema, LoginFormValues } from '@/schemas/auth'
import { initDeviceToken } from '@/utils/deviceToken'
import { saveToken } from '@/utils/secureStore'

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  const insets = useSafeAreaInsets()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const redirectUri = makeRedirectUri({
    scheme: 'com.eegour.livelens',
  })

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '850951594746-5n96ghgrb5gulf5k7oukc09i7t369idq.apps.googleusercontent.com',
    redirectUri,
  })

  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.authentication?.idToken
      if (idToken) handleGoogleLogin(idToken)
      else Alert.alert('Error', 'ID token missing from Google response')
    } else if (response?.type === 'error') {
      Alert.alert('Authentication Error', response.error?.message || 'Failed to authenticate with Google')
    }
  }, [response])

  const handleGoogleLogin = async (idToken: string) => {
    try {
      const { data } = await api.post<AuthResponse>('/auth/google', { id_token: idToken })
      const authToken = data?.token || data?.access_token
      if (!authToken) throw new Error('Authentication token missing')

      await saveToken(authToken)
      if (data?.user?.id) {
        await AsyncStorage.setItem('user_id', String(data.user.id))
        await AsyncStorage.setItem('user', JSON.stringify(data.user))
      }
      await initDeviceToken()
      router.replace({ pathname: '../(tabs)/search' })
    } catch (error) {
      Alert.alert('Google Login Failed', 'Please try again.')
    }
  }

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { data } = await api.post<AuthResponse>('/login', {
        email: values.email.trim(),
        password: values.password,
      })

      const authToken = data?.access_token
      if (!authToken) throw new Error('Authentication token missing')

      await saveToken(authToken)
      if (data?.user?.id) {
        await AsyncStorage.setItem('user_id', String(data.user.id))
        await AsyncStorage.setItem('user', JSON.stringify(data.user))
      }
      await initDeviceToken()
      router.push('../(tabs)/search')
    } catch {
      Alert.alert('Login failed', 'Invalid email or password.')
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text size={28} weight={700} color="grey-800" style={styles.title}>
          Welcome back
        </Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Email address"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordField
              label="Password"
              placeholder="Enter password"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={errors.password?.message}
            />
          )}
        />

        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => promptAsync()}
          disabled={!request}>
          <Ionicons name="logo-google" size={18} color="#DB4437" />
          <Text size={14} weight={500} color="grey-800" style={{ marginLeft: 8 }}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <View style={{ paddingBottom: insets.bottom + 16 }}>
          <Button
            label="Log in"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  title: {
    marginBottom: 28,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 13,
    marginTop: 4,
  },
})
