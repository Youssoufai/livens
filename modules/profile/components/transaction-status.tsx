import { StyleSheet, View } from 'react-native'

import Text from '@/components/text'

import { STATUS_COLORS } from '../profile.data'
import { TransactionStatus } from '../profile.types'

const StatusBadge = ({ status }: { status: TransactionStatus }) => (
  <View
    style={[
      styles.badge,
      { backgroundColor: STATUS_COLORS[status].background },
    ]}
  >
    <Text
      size={12}
      lineHeight={16}
      weight={600}
      color="white"
      style={[styles.text, { color: STATUS_COLORS[status].text }]}
    >
      {status}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 30,
  },
  text: {
    textTransform: 'capitalize',
  },
})

export default StatusBadge
