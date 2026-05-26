import { StyleSheet, View } from 'react-native'

import { SkeletonLoader } from '@/components/skeleton-loader'
import { COLORS } from '@/constants/theme'

const BrowseRequestDetailsSkeleton = () => {
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

        {/* Description section */}
        <View style={styles.section}>
          <SkeletonLoader height={15} style={styles.sectionTitle} />
          <SkeletonLoader height={14} style={styles.descLine1} />
          <SkeletonLoader height={14} style={styles.descLine2} />
          <SkeletonLoader height={14} style={styles.descLine3} />
        </View>

        <View style={styles.divider} />

        {/* Meta section: location, duration, posted */}
        <View style={styles.metaSection}>
          {[80, 60, 70].map((w, i) => (
            <View key={i} style={styles.metaRow}>
              <SkeletonLoader height={24} style={styles.metaIcon} />
              <View style={styles.metaText}>
                <SkeletonLoader
                  height={13}
                  style={{ ...styles.metaLabel, width: `${w}%` }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Offers preview strip */}
        <View style={styles.offersPreview}>
          {[0, 1, 2].map((i) => (
            <SkeletonLoader
              key={i}
              height={28}
              style={{ ...styles.offerAvatar, marginLeft: i > 0 ? -8 : 0 }}
            />
          ))}
          <SkeletonLoader height={13} style={styles.offersText} />
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
    backgroundColor: '#ffffff',
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
    width: '88%',
    borderRadius: 4,
  },
  descLine3: {
    width: '72%',
    borderRadius: 4,
  },
  metaSection: {
    rowGap: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  metaIcon: {
    width: 24,
    borderRadius: 4,
  },
  metaText: {
    flex: 1,
  },
  metaLabel: {
    borderRadius: 4,
    height: 13,
  },
  offersPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    marginTop: 4,
  },
  offerAvatar: {
    width: 28,
    borderRadius: 9999,
  },
  offersText: {
    width: 90,
    borderRadius: 4,
    marginLeft: 8,
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

export default BrowseRequestDetailsSkeleton
