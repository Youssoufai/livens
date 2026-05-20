import { StyleSheet, View } from 'react-native'

import Text from '@/components/text'

const InfoRow = ({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode
  title: string
  text?: string
}) => (
  <View style={styles.infoRow}>
    {icon}
    <View>
      <Text size={14} lineHeight={20} color="grey-500" style={styles.infoText}>
        {title || '—'}
      </Text>
      {text && (
        <Text
          size={14}
          lineHeight={20}
          weight={600}
          color="grey-700"
          style={styles.infoText}
        >
          {text}
        </Text>
      )}
    </View>
  </View>
)

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  infoText: { flex: 1 },
})

export default InfoRow
