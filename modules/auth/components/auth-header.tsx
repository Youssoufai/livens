import { StyleSheet, View } from 'react-native'

import Text from '@/components/text'

const AuthHeader = ({ title, description }: HeaderType) => {
  return (
    <View style={styles.container}>
      <Text size={28} lineHeight={32} weight={700} color="black">
        {title}
      </Text>
      <Text size={16} lineHeight={24} color="grey-400">
        {description}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
  },
})

export default AuthHeader
