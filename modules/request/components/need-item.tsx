import { CheckCircle } from 'lucide-react-native'
import { StyleSheet, View } from 'react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'

const NeedItem = ({ text }: { text: string }) => (
  <View style={styles.needItem}>
    <CheckCircle size={16} color={COLORS.green[500]} />
    <Text size={14} lineHeight={20} color="grey-600">
      {text}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  needItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 8,
  },
})

export default NeedItem
