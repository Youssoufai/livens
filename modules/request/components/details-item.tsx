import { StyleSheet, View } from 'react-native'

import Text from '@/components/text'
import { ReactElement } from 'react'

const DetailsItem = ({
  label,
  value,
  icon,
}: ListItem & { icon?: ReactElement }) => {
  return (
    <View style={styles.container}>
      {icon}
      <View style={styles.textWrapper}>
        <Text size={14} lineHeight={18} weight={600} color="grey-700">
          {label}
        </Text>

        <Text size={14} lineHeight={20} color="grey-400">
          {value}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    columnGap: 12,
    flexDirection: 'row',
  },
  textWrapper: {
    rowGap: 8,
  },
})

export default DetailsItem
