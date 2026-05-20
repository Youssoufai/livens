import { router } from 'expo-router'
import { CheckCircle, Bell, Star } from 'lucide-react-native'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'

export default function StepSubmitted() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <CheckCircle size={64} color={COLORS.green[500]} strokeWidth={1.5} />
        </View>

        <View style={styles.textBlock}>
          <Text size={28} lineHeight={34} weight={700} color="grey-800" align="center">
            Submitted!
          </Text>
          <Text size={15} lineHeight={22} color="grey-400" align="center">
            Thank you! Your response has been submitted and is under review.
          </Text>
        </View>

        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Bell size={18} color={COLORS.grey[400]} />
            </View>
            <Text size={14} lineHeight={20} color="grey-500">
              You'll be notified once it's reviewed.
            </Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Star size={18} color={COLORS.yellow[500]} />
            </View>
            <Text size={14} lineHeight={20} color="grey-500">
              Keep helping to earn more rewards!
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          label="View my requests"
          onPress={() => router.replace('/(tabs)/requests' as never)}
          buttonColor="white"
          labelColor="grey-800"
          btnStyle={styles.outlineBtn}
        />
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)' as never)}
          hitSlop={10}
        >
          <Text size={14} lineHeight={20} weight={600} color="grey-400" align="center">
            Back to home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    rowGap: 28,
  },
  iconWrapper: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: COLORS.green[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: { rowGap: 10, alignItems: 'center' },
  infoList: {
    width: '100%',
    rowGap: 14,
    backgroundColor: COLORS.grey[50],
    borderRadius: 16,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
    rowGap: 16,
  },
  outlineBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.grey[50],
  },
})
