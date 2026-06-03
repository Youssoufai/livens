import { Pressable, Share, StyleSheet, View } from 'react-native'
import { Copy } from 'lucide-react-native'

import Text from '@/components/text'
import { ThemedView } from '@/components/themed-view'
import ScrollView from '@/components/scrollview'
import { showToastMessage } from '@/components/notification'
import { useBoundStore } from '@/state'
import { COLORS } from '@/constants/theme'

export default function ReferAndEarn() {
  const referralCode = useBoundStore((state) => state.user?.referral_code)

  const handleCopy = async () => {
    if (!referralCode) return
    try {
      await Share.share({ message: referralCode })
    } catch {
      showToastMessage('Could not copy referral code', 'error')
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.bannerContainer}>
          <View style={styles.bannerPlaceholder}>
            <Text size={16} weight={600} color="white" align="center">
              Refer friends and get 15% of their earnings
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text size={14} lineHeight={20} color="grey-400">
            Referral code:
          </Text>
          <View style={styles.codeRow}>
            <Text size={16} weight={600} color="grey-800">
              {referralCode ?? '—'}
            </Text>
            <Pressable onPress={handleCopy} style={styles.copyBtn} hitSlop={8}>
              <Copy size={18} color={COLORS.grey[400]} />
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text size={16} lineHeight={22} weight={600} color="grey-800">
            Referees
          </Text>
          <Text size={14} lineHeight={20} color="grey-400">
            You haven't referred anyone yet.
          </Text>
        </View>

        <View style={styles.section}>
          <Text size={16} lineHeight={22} weight={600} color="grey-800">
            How it works
          </Text>
          <View style={styles.steps}>
            <View style={styles.step}>
              <Text size={14} weight={700} color="grey-800">
                1.
              </Text>
              <Text size={14} lineHeight={22} color="grey-600" style={styles.stepText}>
                <Text size={14} weight={600} color="grey-800">
                  Share Your Unique Link{' '}
                </Text>
                Copy your custom invite link and send it to your friends via
                WhatsApp, SMS, or social media.
              </Text>
            </View>
            <View style={styles.step}>
              <Text size={14} weight={700} color="grey-800">
                2.
              </Text>
              <Text size={14} lineHeight={22} color="grey-600" style={styles.stepText}>
                <Text size={14} weight={600} color="grey-800">
                  Earn When They Join & Use the App{' '}
                </Text>
                Once your friend signs up and completes their first 2 tasks or
                requests, you'll receive 15% of their earnings.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  scroll: {
    rowGap: 28,
  },
  bannerContainer: {},
  bannerPlaceholder: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    backgroundColor: COLORS.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  section: {
    rowGap: 10,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  copyBtn: {},
  steps: {
    rowGap: 12,
  },
  step: {
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'flex-start',
  },
  stepText: {
    flex: 1,
  },
})
