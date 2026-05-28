import { Pressable, StyleSheet, View } from 'react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'

import { AccountOptionProps } from '../profile.types'

import BankIcon from '@/assets/icons/account_balance.svg'

const AccountOption = ({
  id,
  bankName,
  accountNumber,
  isSelected,
  isDefault,
  onSelect,
}: AccountOptionProps) => {
  return (
    <Pressable style={styles.container} onPress={() => onSelect(id)}>
      {isDefault && (
        <View style={styles.defaultWrapper}>
          <Text color="white">Default</Text>
        </View>
      )}
      <View style={styles.content}>
        <BankIcon />
        <View style={styles.textWrapper}>
          <Text lineHeight={20} weight={600} color="grey-500">
            {bankName}
          </Text>
          <Text size={14} lineHeight={20} color="grey-400">
            {accountNumber}
          </Text>
        </View>
        <View style={styles.indicatorWrapper}>
          {isSelected && <View style={styles.indicator} />}
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderColor: COLORS.grey[100],
    borderRadius: 8,
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  defaultWrapper: {
    borderRadius: 12,
    backgroundColor: COLORS.primary[500],
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textWrapper: {
    rowGap: 2,
    flex: 1,
  },
  indicatorWrapper: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: COLORS.grey[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: '90%',
    height: '90%',
    borderRadius: 9999,
    backgroundColor: COLORS.primary[500],
  },
})

export default AccountOption
