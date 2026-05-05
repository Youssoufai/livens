import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import ScreenHeader from '@/components/screen-header'
import Text from '@/components/text'
import Button from '@/components/ui/button'
import api from '@/lib/api'
import { BankAccount } from '@/models/auth'
import AddBankModal from './addBank'

export default function WithdrawScreen() {
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null)

  const handleWithdraw = async () => {
    if (!selectedBank) return

    try {
      setLoading(true)
      await api.post('/initiate-withdrawal', {
        amount: Number(selectedBank.amount),
        recipient_code: selectedBank.recipient_code,
      })
      Alert.alert('Withdrawal Successful', 'Your withdrawal request has been submitted.')
      setSelectedBank(null)
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      Alert.alert('Error', err?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Withdraw" />

      <Text size={22} weight={700} color="grey-800" style={styles.title}>
        Withdraw your earnings
      </Text>

      {selectedBank ? (
        <View style={styles.amountCard}>
          <Text size={14} color="grey-400">
            Amount to withdraw
          </Text>
          <Text size={22} weight={700} color="grey-800" style={{ marginTop: 5 }}>
            ₦{Number(selectedBank.amount).toLocaleString()}
          </Text>
          <Text size={13} color="grey-400" style={{ marginTop: 5 }}>
            {selectedBank.bank_name} selected
          </Text>
        </View>
      ) : (
        <Text size={14} color="grey-400" style={styles.subtitle}>
          Add a bank account to withdraw your earnings.
        </Text>
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => setModal(true)} activeOpacity={0.7}>
        <Ionicons name="add" size={20} color="#000" />
        <Text size={15} weight={500} color="grey-800" style={{ marginLeft: 6 }}>
          {selectedBank ? 'Change bank account' : 'Add bank account'}
        </Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }} />

      <Button
        label={loading ? 'Processing...' : 'Withdraw'}
        onPress={handleWithdraw}
        loading={loading}
        disabled={!selectedBank || loading}
        btnStyle={{ marginBottom: 20, borderRadius: 30 }}
      />

      <AddBankModal
        visible={modal}
        onClose={() => setModal(false)}
        onSelectBank={(bank: BankAccount) => {
          setSelectedBank(bank)
          setModal(false)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  title: { marginTop: 10, lineHeight: 30 },
  subtitle: { marginTop: 12 },
  addButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  amountCard: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
})
