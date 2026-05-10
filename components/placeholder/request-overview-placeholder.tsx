import { StyleSheet, View } from 'react-native'

import { SkeletonLoader } from '../skeleton-loader'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 26,
  },
  detailsHeader: {
    marginBottom: 8,
  },
  infoWrapper: {
    flexDirection: 'row',
    columnGap: 6,
  },
  infoText: {
    flex: 1,
    rowGap: 4,
  },
  descriptionWrapper: {
    flex: 1,
    rowGap: 8,
    marginTop: 40,
  },
})

const RequestOverviewSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.detailsHeader}>
        <SkeletonLoader height={24} style={{ width: '70%', marginBottom: 6 }} />
        <SkeletonLoader height={14} style={{ width: '30%' }} />
      </View>

      {/* Location */}
      <View style={styles.infoWrapper}>
        <SkeletonLoader height={18} style={{ width: 18, borderRadius: 4 }} />
        <View style={styles.infoText}>
          <SkeletonLoader height={14} style={{ width: '60%' }} />
          <SkeletonLoader height={12} style={{ width: '40%' }} />
        </View>
      </View>

      {/* Duration */}
      <View style={[styles.infoWrapper, { marginTop: 10 }]}>
        <SkeletonLoader height={18} style={{ width: 18, borderRadius: 4 }} />
        <View style={styles.infoText}>
          <SkeletonLoader height={14} style={{ width: '50%' }} />
          <SkeletonLoader height={12} style={{ width: '35%' }} />
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionWrapper}>
        <SkeletonLoader height={16} style={{ width: '40%' }} />
        <SkeletonLoader height={14} style={{ width: '100%', marginTop: 8 }} />
        <SkeletonLoader height={14} style={{ width: '90%', marginTop: 6 }} />
        <SkeletonLoader height={14} style={{ width: '80%', marginTop: 6 }} />
      </View>

      {/* Button */}
      <SkeletonLoader
        height={44}
        style={{ width: '100%', marginTop: 20, borderRadius: 6 }}
      />
    </View>
  )
}

export default RequestOverviewSkeleton
