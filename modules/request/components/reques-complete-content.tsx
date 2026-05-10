import { View, StyleSheet, Pressable } from 'react-native'
import { useRouter } from 'expo-router'

import Text from '@/components/text'
import Button from '@/components/ui/button'
import { COLORS } from '@/constants/theme'

import { RequestCompleteContentProps } from '../requests.types'

const RequestCompletedContent = ({
  responder,
  onRateResponder,
  onDismissModal,
}: RequestCompleteContentProps) => {
  const router = useRouter()

  const handleAnotherPost = () => {
    onDismissModal()
    router.replace('/(requests)/create-request')
  }

  const returnHome = () => {
    onDismissModal()
    router.replace('/(tabs)/home')
  }

  return (
    <View style={styles.container}>
      <Button
        label={`Rate ${responder}`}
        buttonColor="white"
        labelColor="primary-500"
        btnStyle={styles.rateButton}
        onPress={onRateResponder}
      />
      <Button label="Post another request" onPress={handleAnotherPost} />

      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
        onPress={returnHome}
      >
        <Text
          size={16}
          lineHeight={20}
          color="grey-500"
          align="center"
          weight={600}
          style={styles.link}
        >
          Return home
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
  },
  link: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  rateButton: {
    borderWidth: 1,
    borderColor: COLORS.primary[500],
  },
})

export default RequestCompletedContent
