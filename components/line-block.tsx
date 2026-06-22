import { View, StyleSheet } from 'react-native'

import LineIcon from '@/assets/icons/line.svg'
import { LINE_BLOCK_WIDTH } from '@/constants'

const LineBlock = () => {
  return (
    <View style={styles.lineBlockContainer}>
      <LineIcon />
    </View>
  )
}

const styles = StyleSheet.create({
  lineBlockContainer: {
    width: LINE_BLOCK_WIDTH,
    height: 21,
    position: 'absolute',
    left: 12,
  },
})

export default LineBlock
