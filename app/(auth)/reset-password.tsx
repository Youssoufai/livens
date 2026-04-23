import { StyleSheet, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocalSearchParams, useRouter } from 'expo-router'

import { ThemedView } from '@/components/themed-view'
import { CustomHeader } from '@/components/custom-header'
import AuthHeader from '@/modules/auth/components/auth-header'
import PasswordInput from '@/components/password-input'
import Text from '@/components/text'
import Button from '@/components/ui/button'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { API } from '@/services'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { ResetPasswordFormValues, resetPasswordSchema } from '@/schemas/auth'

export default function ResetPasswordScreen() {
  const router = useRouter()
  const { email } = useLocalSearchParams<{ email: string }>()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      await API.post(API_ENDPOINTS.auth.reset_password, {
        email,
        password: values.password,
        password_confirmation: values.confirmPassword,
      })
      router.replace('/(auth)/login')
    } catch (error) {
      showToastMessage(
        catchErr(error).message || 'Failed to reset password',
        'error'
      )
    }
  }

  return (
    <ThemedView hasBottomPadding style={styles.container}>
      <View style={styles.content}>
        <AuthHeader title="Create new password" description="" />
        <View style={styles.form}>
          <View style={styles.passwordWrapper}>
            <PasswordInput
              control={control}
              name="password"
              label="Create new password"
              placeholder="Create password"
              addPadding={false}
              error={errors.password?.message}
            />
            <Text size={12} lineHeight={16} color="grey-400">
              New password should contain a minimum of 8 characters, including
              one letter, and one number or symbol.
            </Text>
          </View>
          <PasswordInput
            control={control}
            name="confirmPassword"
            label="Confirm new password"
            placeholder="Create password"
            addPadding={false}
            error={errors.confirmPassword?.message}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          label="Change password"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
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
  form: {
    rowGap: 16,
  },
  passwordWrapper: {
    rowGap: 8,
  },
  footer: {
    paddingBottom: 16,
  },
})
