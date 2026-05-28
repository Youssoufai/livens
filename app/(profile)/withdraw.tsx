import { useCallback, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { X, Plus } from 'lucide-react-native'

import Text from '@/components/text'
import Button from '@/components/ui/button'
import { ThemedView } from '@/components/themed-view'
import ProfileHeader from '@/modules/profile/components/profile-header'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { COLORS } from '@/constants/theme'
import { BankAccount } from '@/models/auth'
import WithdrawSheet from '@/modules/profile/components/add-bank-sheet'
import AccountOption from '@/modules/profile/components/account-option'

type Bank = { name: string; code: string; logo?: string }

const NIGERIAN_BANKS: Bank[] = [
  { name: 'Access Bank', code: '044' },
  { name: 'Ecobank', code: '050' },
  { name: 'First Bank', code: '011' },
  { name: 'GTBank', code: '058' },
  { name: 'Kuda Bank', code: '090267' },
  { name: 'Opay', code: '100004' },
  { name: 'Palmpay', code: '100033' },
  { name: 'UBA', code: '033' },
  { name: 'Zenith Bank', code: '057' },
]

export default function WithdrawScreen() {
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null)
  const [accounts, setAccounts] = useState([])
  const [visibleSheet, setVisibleSheet] = useState<string>()
  const [showAddBank, setShowAddBank] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleWithdraw = async () => {
    setVisibleSheet('withdraw')
  }

  const selectedDefaultAccount = useCallback((id: string) => {
    try {
    } catch (error) {}
  }, [])

  const closeSheet = useCallback(() => {
    setVisibleSheet(undefined)
  }, [])

  return (
    <ThemedView hasBottomPadding style={styles.container}>
      <View style={styles.content}>
        <ProfileHeader title="Choose account to withdraw funds into." />
        <View style={styles.body}>
          <FlatList
            data={accounts}
            keyExtractor={() => {}}
            renderItem={({ item }) => {
              return (
                <AccountOption
                  id=""
                  bankName=""
                  accountNumber=""
                  isDefault
                  isSelected
                  onSelect={() => selectedDefaultAccount('')}
                />
              )
            }}
            ListEmptyComponent={
              <Text lineHeight={24} color="grey-400">
                You have not added any bank accounts.
              </Text>
            }
            showsVerticalScrollIndicator={false}
          />
          <Button
            label="Add bank account"
            icon={<Plus size={20} color={COLORS.grey[800]} />}
            alignIcon="left"
            labelColor="grey-500"
            buttonColor="white"
            onPress={() => setShowAddBank(true)}
          />
        </View>
      </View>
      <Button
        label="Withdraw"
        onPress={handleWithdraw}
        loading={loading}
        disabled={!selectedBank}
      />
      <WithdrawSheet
        isVisible={showAddBank}
        type={visibleSheet ?? ''}
        onCloseSheet={closeSheet}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  content: {
    flex: 1,
    rowGap: 24,
    marginBottom: 10,
  },
  body: {
    flex: 1,
    rowGap: 24,
  },
  addBankBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    borderWidth: 1,
    borderColor: COLORS.grey[50],
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
})
