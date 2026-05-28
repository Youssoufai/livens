import { StyleSheet, View } from 'react-native'

import Text from '@/components/text'
import Switch from '@/components/ui/switch'
import { COLORS } from '@/constants/theme'

import { NotifRowProps } from '../profile.types'

const NotifRow = ({ label, description, value, onToggle }: NotifRowProps) => (
  <View style={styles.row}>
    <View style={styles.rowText}>
      <Text size={14} lineHeight={18} weight={600} color="grey-800">
        {label}
      </Text>
      <Text size={14} lineHeight={20} color="grey-400">
        {description}
      </Text>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={COLORS.primary[500]}
      thumbColor={COLORS.white}
    />
  </View>
)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
    columnGap: 12,
  },
  rowText: {
    flex: 1,
    rowGap: 4,
  },
})

export default NotifRow
