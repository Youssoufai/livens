import { StyleSheet, View } from 'react-native'

import { SkeletonLoader } from '@/components/skeleton-loader'
import { COLORS } from '@/constants/theme'

const EditResponseSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Header: step label + progress bar */}
      <View style={styles.header}>
        <SkeletonLoader height={14} style={styles.stepLabel} />
        <SkeletonLoader height={6} style={styles.progressBar} />
      </View>

      <View style={styles.content}>
        {/* Section title */}
        <SkeletonLoader height={18} style={styles.sectionTitle} />
        <SkeletonLoader height={14} style={styles.subtitle} />

        {/* Checklist items */}
        <View style={styles.checklist}>
          {[90, 75, 85, 65].map((w, i) => (
            <View key={i} style={styles.checkItem}>
              <SkeletonLoader height={16} style={styles.checkIcon} />
              <SkeletonLoader
                height={14}
                style={{ ...styles.checkText, width: `${w}%` }}
              />
            </View>
          ))}
        </View>

        {/* Media grid placeholder */}
        <View style={styles.mediaGrid}>
          {[0, 1, 2, 3].map((i) => (
            <SkeletonLoader key={i} height={80} style={styles.mediaCell} />
          ))}
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
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    paddingTop: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  stepLabel: {
    width: 56,
    borderRadius: 4,
  },
  progressBar: {
    flex: 1,
    borderRadius: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    rowGap: 16,
  },
  sectionTitle: {
    width: '60%',
    borderRadius: 4,
  },
  subtitle: {
    width: '80%',
    borderRadius: 4,
    marginTop: -8,
  },
  checklist: {
    rowGap: 10,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  checkIcon: {
    width: 16,
    borderRadius: 9999,
  },
  checkText: {
    borderRadius: 4,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  mediaCell: {
    width: '47%',
    borderRadius: 8,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 12,
  },
  footerButton: {
    width: '100%',
    borderRadius: 8,
  },
})

export default EditResponseSkeleton
