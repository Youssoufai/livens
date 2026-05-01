import { StyleSheet, View } from 'react-native'
import * as RadioGroupPrimitive from '@rn-primitives/radio-group'

import WalletIcon from '@/assets/icons/wallet.svg'
import { COLORS } from '@/constants/theme'
import Text from '@/components/text'
import { formatCurrency } from '@/utils/format'

import { PaymentDetailsProps } from '../requests.types'

const PaymentMethod = ({
  amount,
  value,
  onValueChange,
}: PaymentDetailsProps) => {
  const selected = value === 'wallet'

  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      style={styles.container}
    >
      <RadioGroupPrimitive.Item
        value="wallet"
        style={[styles.option, selected && styles.selectedOption]}
      >
        <WalletIcon height={24} width={24} />
        <View style={styles.textContent}>
          <Text size={16} lineHeight={20} color="grey-500" weight={600}>
            Wallet ({formatCurrency(amount, 0, 'NGN')})
          </Text>
          <Text size={12} lineHeight={16} weight={600} color="grey-300">
            This will be used as your default payment method.
          </Text>
        </View>
        <View style={[styles.radio, selected && styles.radioSelected]}>
          <RadioGroupPrimitive.Indicator style={styles.indicator} />
        </View>
      </RadioGroupPrimitive.Item>
    </RadioGroupPrimitive.Root>
  )
}

const styles = StyleSheet.create({
  container: {},
  option: {
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.grey[300],
    padding: 16,
    flexDirection: 'row',
    columnGap: 16,
  },
  selectedOption: {
    borderColor: COLORS.primary[500],
  },
  textContent: {
    flex: 1,
    rowGap: 4,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: COLORS.grey[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderWidth: 0,
  },
  indicator: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: COLORS.primary[500],
  },
})

export default PaymentMethod
