import { useRouter } from 'expo-router'
import { Image, StyleSheet, View } from 'react-native'
import { useRef } from 'react'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import AppStorage from '@/utils/storage'
import { STORE_KEYS } from '@/constants'
import { OnboardingStatus } from '@/modules/auth/auth.types'

export default function SuccessScreen() {
  const router = useRouter()

  const storage = useRef(new AppStorage()).current

  const finishOnboarding = async () => {
    storage.setItem(STORE_KEYS.onboarding, OnboardingStatus.completed)
    router.replace('/(tabs)/home')
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('@/assets/confetti.gif')} />
        <Text
          size={28}
          lineHeight={32}
          weight={700}
          color="black"
          align="center"
        >
          You’re In!
        </Text>
        <Text size={16} lineHeight={24} color="grey-500" align="center">
          Your account is active, and you can start exploring live updates right
          now.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button label="Done" onPress={finishOnboarding} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    rowGap: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: { alignItems: 'center', paddingBottom: 40 },
})
