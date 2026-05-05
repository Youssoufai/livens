import { StyleSheet, View } from 'react-native'

import { SkeletonLoader } from '@/components/skeleton-loader'
import { COLORS } from '@/constants/theme'

const RequestResponderStatusSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.responderCard}>
        {/* Header */}
        <View style={styles.responderCardContent}>
          <View style={styles.responderLeft}>
            <SkeletonLoader style={styles.avatar} />

            <View style={styles.responderInfo}>
              <SkeletonLoader height={16} style={styles.name} />
              <SkeletonLoader height={12} style={styles.location} />
            </View>
          </View>

          <View style={styles.responderRight}>
            <SkeletonLoader style={styles.messageButton} />
            <SkeletonLoader style={styles.icon} />
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Uploaded content */}
        <View style={styles.section}>
          <SkeletonLoader height={14} style={styles.sectionTitle} />
          <SkeletonLoader height={12} style={styles.lineLong} />
        </View>

        <View style={styles.divider} />

        {/* Comments */}
        <View style={styles.section}>
          <SkeletonLoader height={14} style={styles.sectionTitle} />
          <SkeletonLoader height={12} style={styles.lineShort} />
        </View>
      </View>

      {/* Bottom */}
      <View style={styles.bottomContainer}>
        <View style={styles.warningBox}>
          <SkeletonLoader style={styles.warningIcon} />
          <View style={styles.warningContent}>
            <SkeletonLoader height={14} style={styles.warningTitle} />
            <SkeletonLoader height={12} style={styles.lineLong} />
            <SkeletonLoader height={12} style={styles.lineMedium} />
          </View>
        </View>

        <SkeletonLoader height={44} style={styles.button} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 24,
  },

  responderCard: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  responderCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  responderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },

  responderInfo: {
    rowGap: 6,
    flex: 1,
  },

  name: {
    width: 120,
    borderRadius: 4,
  },

  location: {
    width: 80,
    borderRadius: 4,
  },

  responderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },

  messageButton: {
    width: 90,
    height: 36,
    borderRadius: 6,
  },

  icon: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.grey[200],
    marginVertical: 16,
  },

  section: {
    rowGap: 8,
  },

  sectionTitle: {
    width: 140,
    borderRadius: 4,
  },

  lineLong: {
    width: '90%',
    borderRadius: 4,
  },

  lineMedium: {
    width: '70%',
    borderRadius: 4,
  },

  lineShort: {
    width: '60%',
    borderRadius: 4,
  },

  bottomContainer: {
    marginTop: 'auto',
    rowGap: 12,
    paddingHorizontal: 16,
  },

  warningBox: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 6,
    columnGap: 8,
    backgroundColor: COLORS.grey[100],
  },

  warningIcon: {
    width: 21,
    height: 21,
    borderRadius: 4,
  },

  warningContent: {
    flex: 1,
    rowGap: 6,
  },

  warningTitle: {
    width: 140,
    borderRadius: 4,
  },

  button: {
    width: '100%',
    borderRadius: 6,
  },
})

export default RequestResponderStatusSkeleton
