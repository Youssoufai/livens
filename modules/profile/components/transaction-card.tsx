import { StyleSheet, View } from 'react-native'

import { COLORS } from '@/constants/theme'
import Text from '@/components/text'
import { formatCurrency, formatDate } from '@/utils/format'

import StatusBadge from './transaction-status'
import { TransactionProps } from '../profile.types'
import { format } from 'date-fns'

const TransactionCard = ({
  type,
  amount,
  status,
  date,
  hasBorder = true,
}: TransactionProps) => (
  <View style={[styles.card, !hasBorder && styles.noBorder]}>
    <View style={styles.cardRow}>
      <View style={styles.cardTextWrapper}>
        <Text size={12} lineHeight={16} weight={600} color="grey-400">
          {type}
        </Text>
        <Text size={16} lineHeight={24} color="grey-500">
          {formatCurrency(parseInt(amount), 0, 'NGN')}{' '}
          {status.toLowerCase() === 'debit'
            ? 'withdrawn from wallet'
            : 'added to wallet'}
        </Text>
      </View>
      <StatusBadge status={status} />
    </View>

    <Text size={12} lineHeight={16} color="grey-300">
      {formatDate(date, 'en-NG', '2-digit', '2-digit', '2-digit')}{' '}
      {format(date, 'HH:mm:ss')}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
    rowGap: 4,
    paddingHorizontal: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 4,
    alignItems: 'center',
  },
  cardTextWrapper: {
    rowGap: 4,
    flex: 1,
  },
  cardTitle: {
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
})

export default TransactionCard
