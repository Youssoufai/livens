import { StyleSheet, View } from 'react-native'

import { SkeletonLoader } from '@/components/skeleton-loader'
import { COLORS } from '@/constants/theme'

const OngoingRequestCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* Status bar */}
      <SkeletonLoader height={32} style={styles.statusBar} />

      <View style={styles.content}>
        {/* Title row */}
        <View style={styles.titleRow}>
          <SkeletonLoader height={20} style={styles.titlePlaceholder} />
          <SkeletonLoader height={24} style={styles.menuIcon} />
        </View>

        {/* Description */}
        <SkeletonLoader height={14} style={styles.descLine1} />
        <SkeletonLoader height={14} style={styles.descLine2} />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <SkeletonLoader height={36} style={styles.button} />
          <SkeletonLoader height={36} style={styles.button} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  statusBar: {
    width: '100%',
    borderRadius: 0,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
    rowGap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    marginBottom: 4,
  },
  titlePlaceholder: {
    flex: 1,
    borderRadius: 4,
  },
  menuIcon: {
    width: 24,
    borderRadius: 4,
  },
  descLine1: {
    width: '100%',
    borderRadius: 4,
  },
  descLine2: {
    width: '65%',
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    columnGap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    borderRadius: 30,
  },
})

export default OngoingRequestCardSkeleton
