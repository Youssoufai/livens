import { router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CheckCircle } from 'lucide-react-native'

import Text from '@/components/text'
import Button from '@/components/ui/button'
import { COLORS } from '@/constants/theme'

export default function SubmissionSuccess() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success icon */}
        <View style={styles.iconWrapper}>
          <CheckCircle size={72} color={COLORS.green[500]} strokeWidth={1.5} />
        </View>

        <View style={styles.textBlock}>
          <Text size={28} lineHeight={34} weight={700} color="grey-800" align="center">
            Submitted!
          </Text>
          <Text size={15} lineHeight={22} color="grey-400" align="center">
            Thank you! Your response has been submitted and is under review.
          </Text>
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
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.green[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: { rowGap: 12 },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
  },
  outlineBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.grey[50],
  },
})
