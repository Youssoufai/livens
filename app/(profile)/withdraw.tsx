import { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { X, Plus } from 'lucide-react-native'

import Text from '@/components/text'
import Button from '@/components/ui/button'
import { ThemedView } from '@/components/themed-view'
import ProfileHeader from '@/modules/profile/components/profile-header'
import { COLORS } from '@/constants/theme'
import { BankAccount } from '@/models/auth'
import WithdrawSheet from '@/modules/profile/components/add-bank-sheet'
import AccountOption from '@/modules/profile/components/account-option'
import { useGetAccountsQuery } from '@/hooks/queries/use-profile'
import { generateArray } from '@/utils/generator'
import AccountOptionSkeleton from '@/components/placeholder/account-option-skeleton'
import { AccountItemType } from '@/services/profile/profile.types'

export default function WithdrawScreen() {
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null)
  const [visibleSheet, setVisibleSheet] = useState<string>()
  const [showAddBank, setShowAddBank] = useState(false)
  const [loading, setLoading] = useState(false)

  const { data: accountsData, isLoading } = useGetAccountsQuery()

  useEffect(() => {
    accountsData && setSelectedBank(accountsData[0])
  }, [accountsData])

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

  const accountList: (AccountItemType | string)[] | undefined = isLoading
    ? generateArray<string>(4)
    : accountsData

  return (
    <ThemedView hasBottomPadding style={styles.container}>
      <View style={styles.content}>
        <ProfileHeader title="Choose account to withdraw funds into." />
        <View style={styles.body}>
          <FlatList
            data={accountList ?? []}
            keyExtractor={(item, index) => {
              if (typeof item === 'string') {
                return `account_option_placeholder_${index}`
              }

              return item.id
            }}
            renderItem={({ item }) => {
              if (typeof item === 'string') {
                return <AccountOptionSkeleton />
              }

              return (
                <AccountOption
                  id={item.id}
                  bankName={item.bank_name}
                  accountNumber={item.account_number}
                  isDefault={true}
                  isSelected={
                    selectedBank?.recipient_code === item.recipient_code
                  }
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
            btnStyle={styles.addBankBtn}
            onPress={() => setVisibleSheet('add_account')}
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
        isVisible={!!visibleSheet}
        type={visibleSheet ?? ''}
        recipientCode={selectedBank?.recipient_code ?? ''}
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
    // flex: 1,
    rowGap: 24,
  },
  addBankBtn: {
    borderWidth: 1,
    borderColor: COLORS.grey[50],
  },
})
