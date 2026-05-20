import { StyleSheet, View } from 'react-native'

import { SkeletonLoader } from '@/components/skeleton-loader'
import { COLORS } from '@/constants/theme'

const SentOfferCardSkeleton = () => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <SkeletonLoader height={14} style={styles.labelPlaceholder} />
        <SkeletonLoader height={24} style={styles.badgePlaceholder} />
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <SkeletonLoader height={16} style={styles.titlePlaceholder} />
        <SkeletonLoader height={14} style={styles.descLine1} />
        <SkeletonLoader height={14} style={styles.descLine2} />
        <SkeletonLoader height={12} style={styles.datePlaceholder} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  labelPlaceholder: {
    width: 110,
    borderRadius: 4,
  },
  badgePlaceholder: {
    width: 115,
    borderRadius: 20,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grey[50],
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    rowGap: 8,
  },
  titlePlaceholder: {
    width: '50%',
    borderRadius: 4,
  },
  descLine1: {
    width: '100%',
    borderRadius: 4,
  },
  descLine2: {
    width: '75%',
    borderRadius: 4,
  },
  datePlaceholder: {
    width: '38%',
    borderRadius: 4,
    marginTop: 2,
  },
})

export default SentOfferCardSkeleton
