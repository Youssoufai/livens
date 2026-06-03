import { StyleSheet, View } from 'react-native'
import { useState } from 'react'

import Button from '@/components/ui/button'
import { intiateWithdrawal } from '@/services/payment'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import SheetInput from '@/components/ui/sheet-input'

import { WithdrawalContentProps } from '../profile.types'

const WithdrawAmount = ({
  recipientCode,
  onCloseSheet,
}: WithdrawalContentProps) => {
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const handleWithdrawal = async () => {
    if (!amount) return

    let errMsg = ''
    setLoading(true)
    try {
      await intiateWithdrawal({
        amount: +amount,
        recipient_code: recipientCode,
      })
      onCloseSheet()
    } catch (error) {
      errMsg = catchErr(error)?.message ?? 'Failed to initiate withdrawal'
    } finally {
      setLoading(false)
      showToastMessage(
        errMsg || 'The amount has been sent to your account',
        errMsg ? 'error' : 'success'
      )
    }
  }

  return (
    <View style={styles.container}>
      <SheetInput
        keyboardType="number-pad"
        label="Amount"
        value={amount}
        onChangeText={setAmount}
      />
      <Button label="Proceed" onPress={handleWithdrawal} loading={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
    paddingTop: 12,
  },
})

export default WithdrawAmount
