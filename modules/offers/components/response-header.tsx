import Text from '@/components/text'
import { StyleSheet, View } from 'react-native'

const ResponseHeader = ({ title, description }: HeaderType) => {
  return (
    <View>
      <Text size={28} lineHeight={32} weight={700} color="grey-500">
        {title}
      </Text>
      {description && (
        <Text
          size={16}
          lineHeight={24}
          color="grey-500"
          style={styles.subtitle}
        >
          {description}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  subtitle: { marginTop: 8 },
})

export default ResponseHeader
