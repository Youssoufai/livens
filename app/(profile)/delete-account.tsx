import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { useRef } from 'react'
import { useRouter } from 'expo-router'
import { AlertCircle } from 'lucide-react-native'

import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Text from '@/components/text'
import { ThemedView } from '@/components/themed-view'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { useBoundStore } from '@/state'
import { AuthenticatedAPI } from '@/services'
import AppStorage from '@/utils/storage'
import { STORE_KEYS } from '@/constants'
import { COLORS } from '@/constants/theme'
import { deleteAccountSchema, DeleteAccountFormValues } from '@/schemas/profile'

export default function DeleteAccountScreen() {
  const router = useRouter()
  const logout = useBoundStore((state) => state.logout)
  const storage = useRef(new AppStorage()).current

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DeleteAccountFormValues>({
    resolver: yupResolver(deleteAccountSchema),
    defaultValues: { confirmation: '' },
  })

  const confirmationValue = watch('confirmation')
  const isConfirmed = confirmationValue === 'Delete my account'

  const onSubmit: SubmitHandler<DeleteAccountFormValues> = async () => {
    try {
      await AuthenticatedAPI.delete('/delete-account')
      logout()
      storage.removeItem(STORE_KEYS.token)
      router.replace('/(auth)/login')
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Failed to delete account. Try again.',
        'error'
      )
    }
  }

  return (
    <ThemedView hasBottomPadding style={styles.container}>
      <View style={styles.content}>
        <View style={styles.warning}>
          <AlertCircle size={18} color={COLORS.red[500]} />
          <Text size={14} lineHeight={20} color="red-500" style={styles.warningText}>
            Deleting your account is irreversible. Please proceed with caution.
          </Text>
        </View>

        <Text size={14} lineHeight={22} color="grey-500">
          You're about to permanently delete your Livelens account. This action
          cannot be undone. All your data, requests, and earnings will be lost.
          Are you sure you want to continue?
        </Text>

        <View style={styles.inputSection}>
          <Text size={14} lineHeight={20} weight={500} color="grey-700">
            Please enter 'Delete my account'
          </Text>
          <Input
            control={control}
            name="confirmation"
            placeholder="Confirmation"
            error={errors.confirmation?.message}
          />
        </View>
      </View>

      <View style={styles.actions}>
        <Button
          label="Yes, delete my account"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={!isConfirmed}
          buttonColor={isConfirmed ? 'primary-500' : undefined}
        />
        <Button
          label="Cancel"
          onPress={() => router.back()}
          buttonColor="white"
          labelColor="grey-800"
          btnStyle={styles.cancelBtn}
        />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  content: {
    flex: 1,
    rowGap: 20,
    marginBottom: 8,
  },
  warning: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 8,
    backgroundColor: '#FFF0F0',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFD0D0',
  },
  warningText: {
    flex: 1,
  },
  inputSection: {
    rowGap: 8,
  },
  actions: {
    rowGap: 12,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: COLORS.grey[100],
  },
})
