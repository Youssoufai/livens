import { StyleSheet, View } from 'react-native'

import { SkeletonLoader } from '@/components/skeleton-loader'
import { COLORS } from '@/constants/theme'

const TransactionCardSkeleton = () => (
  <View style={styles.card}>
    <View style={styles.cardRow}>
      <SkeletonLoader height={14} style={styles.title} />
      <SkeletonLoader height={22} style={styles.badge} />
    </View>
    <SkeletonLoader height={16} style={styles.amount} />
    <SkeletonLoader height={13} style={styles.date} />
  </View>
)

const styles = StyleSheet.create({
  card: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
    rowGap: 8,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 8,
  },
  title: {
    flex: 1,
    borderRadius: 4,
  },
  badge: {
    width: 80,
    borderRadius: 20,
  },
  amount: {
    width: '50%',
    borderRadius: 4,
  },
  date: {
    width: '35%',
    borderRadius: 4,
  },
})

export default TransactionCardSkeleton
