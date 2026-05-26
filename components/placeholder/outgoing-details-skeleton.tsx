import { StyleSheet, View } from 'react-native'

import { SkeletonLoader } from '@/components/skeleton-loader'
import { COLORS } from '@/constants/theme'

const OutgoingDetailsSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Reward row */}
        <View style={styles.rewardRow}>
          <SkeletonLoader height={18} style={styles.rewardIcon} />
          <SkeletonLoader height={14} style={styles.rewardText} />
        </View>

        {/* User row */}
        <View style={styles.userRow}>
          <SkeletonLoader height={40} style={styles.avatar} />
          <View style={styles.userMeta}>
            <View style={styles.nameRow}>
              <SkeletonLoader height={14} style={styles.name} />
              <SkeletonLoader height={14} style={styles.verifiedBadge} />
            </View>
            <SkeletonLoader height={12} style={styles.postedAt} />
          </View>
        </View>

        <View style={styles.divider} />

        {/* Meta section: location + duration */}
        <View style={styles.metaSection}>
          <View style={styles.metaRow}>
            <SkeletonLoader height={18} style={styles.metaIcon} />
            <View style={styles.metaText}>
              <SkeletonLoader height={12} style={styles.metaLabel} />
              <SkeletonLoader height={14} style={styles.metaValue} />
            </View>
          </View>
          <View style={styles.metaRow}>
            <SkeletonLoader height={18} style={styles.metaIcon} />
            <View style={styles.metaText}>
              <SkeletonLoader height={12} style={styles.metaLabel} />
              <SkeletonLoader height={14} style={styles.metaValue} />
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Description section */}
        <View style={styles.section}>
          <SkeletonLoader height={15} style={styles.sectionTitle} />
          <SkeletonLoader height={14} style={styles.descLine1} />
          <SkeletonLoader height={14} style={styles.descLine2} />
          <SkeletonLoader height={14} style={styles.descLine3} />
        </View>
      </View>

      {/* Footer button */}
      <View style={styles.footer}>
        <SkeletonLoader height={44} style={styles.footerButton} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
    rowGap: 16,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    paddingVertical: 5,
  },
  rewardIcon: {
    width: 18,
    borderRadius: 4,
  },
  rewardText: {
    width: 60,
    borderRadius: 4,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  avatar: {
    width: 40,
    borderRadius: 9999,
  },
  userMeta: {
    flex: 1,
    rowGap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  name: {
    width: 100,
    borderRadius: 4,
  },
  verifiedBadge: {
    width: 60,
    borderRadius: 4,
  },
  postedAt: {
    width: 80,
    borderRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grey[50],
  },
  metaSection: {
    rowGap: 12,
  },
  metaRow: {
    flexDirection: 'row',
    columnGap: 6,
  },
  metaIcon: {
    width: 18,
    borderRadius: 4,
  },
  metaText: {
    flex: 1,
    rowGap: 4,
  },
  metaLabel: {
    width: '40%',
    borderRadius: 4,
  },
  metaValue: {
    width: '70%',
    borderRadius: 4,
  },
  section: {
    rowGap: 8,
  },
  sectionTitle: {
    width: '55%',
    borderRadius: 4,
    marginBottom: 2,
  },
  descLine1: {
    width: '100%',
    borderRadius: 4,
  },
  descLine2: {
    width: '90%',
    borderRadius: 4,
  },
  descLine3: {
    width: '75%',
    borderRadius: 4,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.grey[50],
    backgroundColor: COLORS.white,
  },
  footerButton: {
    width: '100%',
    borderRadius: 8,
  },
})

export default OutgoingDetailsSkeleton
