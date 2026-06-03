import { StyleSheet, View } from 'react-native'

import { SkeletonLoader } from '@/components/skeleton-loader'
import { COLORS } from '@/constants/theme'

const AccountOptionSkeleton = () => (
  <View style={styles.container}>
    <View style={styles.content}>
      <SkeletonLoader height={24} style={styles.icon} />
      <View style={styles.textWrapper}>
        <SkeletonLoader height={16} style={styles.bankName} />
        <SkeletonLoader height={14} style={styles.accountNumber} />
      </View>
      <SkeletonLoader height={20} style={styles.indicator} />
    </View>
  </View>
)

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
  icon: {
    width: 24,
    borderRadius: 4,
  },
  textWrapper: {
    flex: 1,
    rowGap: 6,
  },
  bankName: {
    width: '60%',
    borderRadius: 4,
  },
  accountNumber: {
    width: '45%',
    borderRadius: 4,
  },
  indicator: {
    width: 20,
    borderRadius: 9999,
  },
})

export default AccountOptionSkeleton
