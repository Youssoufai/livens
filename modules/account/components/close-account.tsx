import { useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { useRouter } from 'expo-router'
import { AlertCircle } from 'lucide-react-native'

import Button from '@/components/ui/button'
import FullScreenModal, { Modal } from '@/components/ui/modal'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { STORE_KEYS } from '@/constants'
import { showToastMessage } from '@/components/notification'
import { AuthenticatedAPI } from '@/services'
import AppStorage from '@/utils/storage'
import { catchErr } from '@/utils/error-handlers'
import { useBoundStore } from '@/state'
import { deleteAccount } from '@/services/profile'
import Input from '@/components/ui/input'

import { CloseAccountProps } from '../account.types'

const CloseAccount = ({ visible, onClose }: CloseAccountProps) => {
  const [confirmation, setConfirmation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const logout = useBoundStore((state) => state.logout)
  const storage = useRef(new AppStorage()).current

  useEffect(() => {
    if (!visible) {
      setConfirmation('')
      setIsSubmitting(false)
    }
  }, [visible])

  const resetAndClose = () => {
    setConfirmation('')
    setIsSubmitting(false)
    onClose()
  }

  const handleCloseAccount = async () => {
    if (confirmation !== 'Delete my account') return

    setIsSubmitting(true)

    try {
      await deleteAccount()
      logout()
      storage.removeItem(STORE_KEYS.token)
      resetAndClose()
      router.replace('/(auth)/login')
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Failed to close account. Please try again.',
        'error'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FullScreenModal
      fullHeight
      visible={visible}
      contentStyle={styles.modal}
      onDismiss={resetAndClose}
    >
      <View style={styles.content}>
        <View style={styles.warningBox}>
          <AlertCircle size={18} color={COLORS.red[500]} />
          <Text
            size={14}
            lineHeight={20}
            color="red-500"
            style={styles.warningText}
          >
            Closing your account is irreversible. Please proceed with caution.
          </Text>
        </View>

        <Text size={14} lineHeight={22} weight={500} color="grey-500">
          You are about to permanently close your Livelens account. All your
          data, requests, and earnings will be removed.
        </Text>

        <View style={styles.inputSection}>
          <Text size={14} lineHeight={20} weight={500} color="grey-700">
            Please enter 'Delete my account'
          </Text>
          <Input
            value={confirmation}
            onChangeText={setConfirmation}
            placeholder="Confirmation"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.actions}>
          <Button
            label="Cancel"
            onPress={resetAndClose}
            buttonColor="white"
            labelColor="grey-800"
            btnStyle={styles.cancelBtn}
          />
          <Button
            label="Close account"
            onPress={handleCloseAccount}
            loading={isSubmitting}
            disabled={confirmation !== 'Delete my account' || isSubmitting}
            buttonColor="red-500"
          />
        </View>
      </View>
    </FullScreenModal>
  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#0000002f',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  content: {
    rowGap: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginVertical: 'auto',
  },
  warningBox: {
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
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.grey[800],
  },
  actions: {
    rowGap: 12,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: COLORS.grey[100],
  },
})

export default CloseAccount
