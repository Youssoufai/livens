import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import Button from '@/components/ui/button'
import Text from '@/components/text'

const EmptyState = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text
          size={20}
          lineHeight={24}
          weight={600}
          align="center"
          color="black"
        >
          You don’t have any requests
        </Text>
        <Text
          size={16}
          lineHeight={24}
          weight={400}
          align="center"
          color="grey-400"
        >
          Your posted requests will be visible to respondents. Create a request
          now.
        </Text>
      </View>
      <Button
        label="Create a request"
        btnStyle={styles.button}
        onPress={() => router.push('/(requests)/create-request')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    rowGap: 40,
    alignItems: 'center',
  },
  textWrapper: {
    rowGap: 8,
  },
  button: {
    width: 195,
  },
})

export default EmptyState
