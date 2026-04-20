import { yupResolver } from '@hookform/resolvers/yup'
import * as SecureStore from 'expo-secure-store'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '@/components/form-field'
import PasswordField from '@/components/password-field'
import ProgressBar from '@/components/progress-bar'
import Button from '@/components/ui/button'
import Text from '@/components/text'
import api from '@/lib/api'
import { AuthResponse } from '@/models/auth'
import { registerSchema, RegisterFormValues } from '@/schemas/auth'
import { saveToken } from '@/utils/secureStore'

export default function CreateAccount() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    const cleanedPhone = values.phone.replace(/\s+/g, '').trim()
    const formattedPhone = cleanedPhone.startsWith('+234')
      ? cleanedPhone
      : '+234' + cleanedPhone.replace(/^0/, '')

    try {
      const { data } = await api.post<AuthResponse>('/register', {
        name: values.fullName.trim(),
        email: values.email.trim(),
        password: values.password,
        password_confirmation: values.confirmPassword,
        phone: formattedPhone,
      })

      if (data?.access_token) {
        await saveToken(data.access_token)
      }

      await SecureStore.setItemAsync('email', values.email.trim())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.push('/confirm-email' as any)
    } catch (error: unknown) {
      const err = error as { response?: { data?: { errors?: Record<string, string[]>; message?: string } } }
      const message = err?.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join('\n')
        : err?.response?.data?.message || 'Registration failed. Please try again.'
      Alert.alert('Error', message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.container}>
          <ProgressBar progress={33} />

          <Text size={24} weight={700} color="grey-800" style={styles.title}>
            Create your account
          </Text>
          <Text size={15} color="grey-500" style={styles.subtitle}>
            Get real-time location updates and full access to all features.
          </Text>

          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                label="Full Name"
                placeholder="John Doe"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.fullName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                label="Email"
                placeholder="john@example.com"
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
                placeholder="Create a password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.password?.message}
              />
            )}
          />

          <Text size={12} color="grey-400" style={styles.hint}>
            Minimum 8 characters. Use letters and numbers.
          </Text>

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <PasswordField
                label="Confirm Password"
                placeholder="Confirm password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <Text size={14} weight={600} color="grey-800" style={styles.label}>
            Phone Number
          </Text>
          <View style={styles.phoneRow}>
            <View style={styles.countryCode}>
              <Text size={16}>🇳🇬</Text>
              <Text size={14} weight={500} color="grey-800" style={{ marginLeft: 4 }}>
                +234
              </Text>
            </View>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  label=""
                  placeholder="8012345678"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors.phone?.message}
                  style={styles.phoneInput}
                />
              )}
            />
          </View>

          <Button
            label="Create Account"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            disabled={isSubmitting}
            btnStyle={{ marginTop: 8 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    marginTop: 16,
    marginBottom: 6,
  },
  subtitle: {
    marginBottom: 24,
    lineHeight: 22,
  },
  hint: {
    marginTop: -10,
    marginBottom: 14,
  },
  label: {
    marginBottom: 6,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#FAFAFA',
    marginTop: 0,
  },
  phoneInput: {
    flex: 1,
  },
})
