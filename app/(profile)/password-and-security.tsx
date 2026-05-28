import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react'

import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Switch from '@/components/ui/switch'
import Text from '@/components/text'
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

  const onSubmit: SubmitHandler<ChangePasswordFormValues> = async (values) => {
    try {
      await AuthenticatedAPI.post('/change-password', {
        current_password: values.currentPassword,
        new_password: values.newPassword,
        new_password_confirmation: values.confirmPassword,
      })
      reset()
      showToastMessage('Password updated successfully', 'success')
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Failed to update password',
        'error'
      )
    }
  }

  return (
    <ThemedView hasBottomPadding style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.section}>
          <View style={styles.form}>
            <Input
              control={control}
              name="currentPassword"
              label="Current password"
              secureTextEntry
              error={errors.currentPassword?.message}
            />
            <Input
              control={control}
              name="newPassword"
              label="New password"
              secureTextEntry
              error={errors.newPassword?.message}
            />
            <Input
              control={control}
              name="confirmPassword"
              label="Confirm new password"
              secureTextEntry
              error={errors.confirmPassword?.message}
            />
          </View>
        </View>
      </ScrollView>

      <Button
        label="Update password"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={!isValid}
        btnStyle={styles.button}
      />
    </ThemedView>
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
