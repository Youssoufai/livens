import { StyleSheet, View } from 'react-native'

import Text from '@/components/text'

const DetailsRow = ({ label, value }: ListItem) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftText}>
        <Text size={14} lineHeight={18} weight={600} color="grey-700">
          {label}
        </Text>
      </View>
      <View style={styles.rightText}>
        <Text size={14} lineHeight={20} color="grey-400">
          {value}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 12,
  },
  leftText: {
    flexBasis: '35%',
  },
  rightText: {
    flexBasis: '55%',
  },
})

export default DetailsRow
