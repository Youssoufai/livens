import { StyleSheet, View } from 'react-native'
import { Divider } from 'react-native-paper'

import { SkeletonLoader } from '@/components/skeleton-loader'
import { COLORS } from '@/constants/theme'

const PostDetailSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* User row */}
      <View style={styles.userRow}>
        <SkeletonLoader height={44} style={styles.avatar} />
        <View style={styles.userMeta}>
          <SkeletonLoader height={14} style={styles.name} />
          <SkeletonLoader height={12} style={styles.location} />
        </View>
      </View>

      {/* Description */}
      <View style={styles.descBlock}>
        <SkeletonLoader height={20} style={styles.descLine1} />
        <SkeletonLoader height={20} style={styles.descLine2} />
        <SkeletonLoader height={20} style={styles.descLine3} />
      </View>

      {/* Location row */}
      <View style={styles.locationRow}>
        <SkeletonLoader height={12} style={styles.locationLabel} />
        <SkeletonLoader height={12} style={styles.locationValue} />
      </View>

      <Divider style={styles.divider} />

      {/* Stats row */}
      <View style={styles.statsRow}>
        <SkeletonLoader height={14} style={styles.statChip} />
        <SkeletonLoader height={14} style={styles.statChip} />
        <SkeletonLoader height={14} style={styles.statChip} />
      </View>

      <Divider style={styles.divider} />

      {/* Responses heading */}
      <SkeletonLoader height={18} style={styles.responsesTitle} />

      {/* Response card */}
      <View style={styles.responseCard}>
        <View style={styles.responderRow}>
          <SkeletonLoader height={40} style={styles.responderAvatar} />
          <View style={styles.responderMeta}>
            <SkeletonLoader height={14} style={styles.responderName} />
            <SkeletonLoader height={12} style={styles.responderTime} />
          </View>
        </View>

        {/* Comment lines */}
        <View style={styles.commentBlock}>
          <SkeletonLoader height={14} style={styles.commentLine1} />
          <SkeletonLoader height={14} style={styles.commentLine2} />
        </View>

        {/* Media strip */}
        <View style={styles.mediaStrip}>
          <SkeletonLoader height={160} style={styles.mediaThumb} />
          <SkeletonLoader height={160} style={styles.mediaThumb} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    rowGap: 6,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    borderRadius: 9999,
  },
  userMeta: {
    flex: 1,
    rowGap: 6,
  },
  name: {
    width: 120,
    borderRadius: 4,
  },
  location: {
    width: 80,
    borderRadius: 4,
  },
  descBlock: {
    rowGap: 8,
  },
  descLine1: {
    width: '100%',
    borderRadius: 4,
  },
  descLine2: {
    width: '85%',
    borderRadius: 4,
  },
  descLine3: {
    width: '65%',
    borderRadius: 4,
  },
  locationRow: {
    flexDirection: 'row',
    columnGap: 6,
    marginTop: 6,
  },
  locationLabel: {
    width: 100,
    borderRadius: 4,
  },
  locationValue: {
    width: 80,
    borderRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grey[50],
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  statChip: {
    width: 72,
    borderRadius: 4,
  },
  responsesTitle: {
    width: 110,
    borderRadius: 4,
  },
  responseCard: {
    marginTop: 12,
    rowGap: 12,
  },
  responderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  responderAvatar: {
    width: 40,
    borderRadius: 9999,
  },
  responderMeta: {
    flex: 1,
    rowGap: 6,
  },
  responderName: {
    width: 100,
    borderRadius: 4,
  },
  responderTime: {
    width: 60,
    borderRadius: 4,
  },
  commentBlock: {
    rowGap: 8,
  },
  commentLine1: {
    width: '100%',
    borderRadius: 4,
  },
  commentLine2: {
    width: '75%',
    borderRadius: 4,
  },
  mediaStrip: {
    flexDirection: 'row',
    columnGap: 10,
  },
  mediaThumb: {
    width: 160,
    borderRadius: 8,
  },
})

export default PostDetailSkeleton
