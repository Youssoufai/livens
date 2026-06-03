import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useRef, useState } from 'react'

import Button from '@/components/ui/button'
import { ThemedView } from '@/components/themed-view'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { AuthenticatedAPI } from '@/services'
import { COLORS } from '@/constants/theme'
import ScrollView from '@/components/scrollview'
import {
  changePasswordSchema,
  ChangePasswordFormValues,
} from '@/schemas/profile'
import { API_ENDPOINTS } from '@/constants/endpoints'
import PasswordInput from '@/components/password-input'
import { useBoundStore } from '@/state'
import AppStorage from '@/utils/storage'
import { STORE_KEYS } from '@/constants'
import ScreenLoader from '@/components/screen-loader'

export default function PasswordAndSecurity() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ChangePasswordFormValues>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const [isRedirecting, setIsRedirecting] = useState(false)

  const storage = useRef(new AppStorage()).current

  const router = useRouter()

  const logout = useBoundStore((state) => state.logout)

  useFocusEffect(
    useCallback(() => {
      if (isRedirecting) {
        const timeoutId = setTimeout(() => {
          setIsRedirecting(false)
          logout()
          storage.removeItem(STORE_KEYS.token)
          router.replace('/(auth)/login')
        }, 2500)

        return () => clearTimeout(timeoutId)
      }
    }, [isRedirecting, router, logout])
  )

  const submitForm: SubmitHandler<ChangePasswordFormValues> = async (
    values
  ) => {
    try {
      await AuthenticatedAPI.patch(API_ENDPOINTS.profile.change_password, {
        current_password: values.currentPassword,
        password: values.newPassword,
        password_confirmation: values.confirmPassword,
      })
      reset()
      setIsRedirecting(true)
      showToastMessage('Password updated successfully', 'success')
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Failed to update password',
        'error'
      )
    }
  }

  return (
    <>
      <ThemedView hasBottomPadding style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.section}>
            <View style={styles.form}>
              <PasswordInput
                control={control}
                name="currentPassword"
                label="Current password"
                placeholder=""
                error={errors.currentPassword?.message}
              />
              <PasswordInput
                control={control}
                name="newPassword"
                label="New password"
                placeholder=""
                error={errors.newPassword?.message}
              />
              <PasswordInput
                control={control}
                name="confirmPassword"
                label="Confirm new password"
                placeholder=""
                error={errors.confirmPassword?.message}
              />
            </View>
          </View>
        </ScrollView>

        <Button
          label="Update password"
          onPress={handleSubmit(submitForm)}
          loading={isSubmitting}
          disabled={!isValid}
          btnStyle={styles.button}
        />
      </ThemedView>
      <ScreenLoader
        isLoading={isRedirecting}
        content="Redirecting to login..."
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  scroll: {
    flex: 1,
    rowGap: 32,
    marginBottom: 10,
  },
  section: {
    rowGap: 20,
  },
  sectionLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
  },
  form: {
    rowGap: 4,
  },
  button: {
    marginBottom: 16,
  },
})
