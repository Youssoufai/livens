import { StyleSheet, View } from 'react-native'

import { SkeletonLoader } from '@/components/skeleton-loader'
import { COLORS } from '@/constants/theme'

const BrowseRequestCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {/* title row */}
      <View style={styles.titleRow}>
        <SkeletonLoader height={18} style={styles.titlePlaceholder} />
        <SkeletonLoader height={22} style={styles.badgePlaceholder} />
      </View>

      {/* location row */}
      <View style={styles.locationRow}>
        <SkeletonLoader height={12} style={styles.locationIcon} />
        <SkeletonLoader height={12} style={styles.locationText} />
      </View>

      {/* footer */}
      <View style={styles.footer}>
        <View style={styles.userRow}>
          <SkeletonLoader height={30} style={styles.avatar} />
          <View style={styles.requesterDetails}>
            <SkeletonLoader height={14} style={styles.namePlaceholder} />
            <SkeletonLoader height={12} style={styles.addressPlaceholder} />
          </View>
        </View>
        <SkeletonLoader height={12} style={styles.timePlaceholder} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    rowGap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    columnGap: 12,
  },
  titlePlaceholder: {
    flex: 1,
    borderRadius: 4,
  },
  badgePlaceholder: {
    width: 52,
    borderRadius: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  locationIcon: {
    width: 12,
    borderRadius: 2,
  },
  locationText: {
    flex: 1,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    flex: 1,
  },
  avatar: {
    width: 30,
    borderRadius: 9999,
  },
  requesterDetails: {
    flex: 1,
    rowGap: 4,
  },
  namePlaceholder: {
    width: '60%',
    borderRadius: 4,
  },
  addressPlaceholder: {
    width: '80%',
    borderRadius: 4,
  },
  timePlaceholder: {
    width: 48,
    borderRadius: 4,
  },
})

export default BrowseRequestCardSkeleton
