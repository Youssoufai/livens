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
    <Pressable
      style={[styles.container, isSelected && styles.selectedOption]}
      onPress={() => onSelect(id)}
    >
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
        <View
          style={[
            styles.indicatorWrapper,
            isSelected && styles.loseIndicatorBorder,
          ]}
        >
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
    position: 'relative',
    overflow: 'visible',
  },
  selectedOption: {
    borderColor: COLORS.primary[500],
  },
  defaultBadgeContainer: {
    position: 'absolute',
    top: -14,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
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
    paddingVertical: 4,
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
  loseIndicatorBorder: {
    borderWidth: 0,
  },
  indicator: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
    backgroundColor: COLORS.white,
    borderWidth: 5,
    borderColor: COLORS.primary[500],
  },
})

export default AccountOption
