// app/onboarding/success.tsx
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import Button from '@/components/ui/button'

export default function SuccessScreen() {
  const router = useRouter()

  const finishOnboarding = async () => {
    await AsyncStorage.setItem('seenOnboarding', 'true')
    router.replace('/(root)/(tabs)/search')
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🎉 You’re In!</Text>
        <Text style={styles.subtitle}>
          Your account is active, and you can start exploring live updates right
          now.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Done"
          onPress={finishOnboarding}
          style={{ width: '80%' }}
        />
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
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  footer: { alignItems: 'center', paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
    color: '#333',
  },
})
