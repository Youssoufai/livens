import { router } from 'expo-router'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

import Text from '@/components/text'

export default function RequestSuccess() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/success.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text size={22} weight={700} color="danger" align="center" style={styles.title}>
        Your request has been posted!
      </Text>

      <Text size={15} color="grey-400" align="center" style={styles.subtitle}>
        Your request is now visible to the public. Expect some responses soon!
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => router.push('/requests' as never)}>
        <Text size={15} weight={600} style={{ color: '#fff' }}>
          Go to My Requests
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        activeOpacity={0.8}
        onPress={() => router.push('/search' as never)}>
        <Text size={15} weight={500} color="danger">
          Return Home
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: { width: 160, height: 160, marginBottom: 30 },
  title: { marginBottom: 10 },
  subtitle: { lineHeight: 22, marginBottom: 40 },
  button: {
    backgroundColor: '#FF3344',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 12,
  },
  secondaryButton: { paddingVertical: 10 },
})
