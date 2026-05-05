import { StyleSheet, View } from 'react-native'

import { SkeletonLoader } from '@/components/skeleton-loader'
import { COLORS } from '@/constants/theme'

const ResponseCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContent}>
        {/* Avatar */}
        <SkeletonLoader style={styles.imageWrapper} />

        {/* Name + Location */}
        <View style={styles.responderDetails}>
          <SkeletonLoader height={16} style={styles.name} />
          <SkeletonLoader height={12} style={styles.location} />
        </View>

        {/* Ratings */}
        <View style={styles.ratingsContainer}>
          <View style={styles.ratingsWrapper}>
            <SkeletonLoader height={12} style={styles.smallText} />
            <SkeletonLoader style={styles.icon} />
          </View>

          <View style={styles.ratingsWrapper}>
            <SkeletonLoader height={12} style={styles.mediumText} />
            <SkeletonLoader style={styles.icon} />
          </View>
        </View>
      </View>

      {/* Button */}
      <SkeletonLoader height={40} style={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.white,
  },
  detailsContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 9999,
  },
  responderDetails: {
    flex: 1,
    marginLeft: 8,
    rowGap: 6,
  },
  name: {
    width: '70%',
    borderRadius: 4,
  },
  location: {
    width: '50%',
    borderRadius: 4,
  },
  ratingsContainer: {
    alignItems: 'flex-end',
    rowGap: 6,
  },
  ratingsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  smallText: {
    width: 30,
    borderRadius: 4,
  },
  mediumText: {
    width: 80,
    borderRadius: 4,
  },
  icon: {
    width: 18,
    height: 18,
    borderRadius: 4,
  },
  button: {
    width: '100%',
    borderRadius: 6,
  },
})

export default ResponseCardSkeleton
