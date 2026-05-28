import { Link } from 'expo-router'
import { Pressable, StyleSheet, View } from 'react-native'
import { ChevronRight } from 'lucide-react-native'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'

import { SupportItemProps } from '../profile.types'

const SupportItem = ({ icon, title, description, href }: SupportItemProps) => (
  <Link href={href as any} asChild>
    <Pressable style={styles.item}>
      <View style={styles.itemIcon}>{icon}</View>
      <View style={styles.itemText}>
        <Text size={16} lineHeight={20} weight={600} color="grey-800">
          {title}
        </Text>
        <Text size={14} lineHeight={20} color="grey-400">
          {description}
        </Text>
      </View>
      <ChevronRight size={20} color={COLORS.grey[200]} />
    </Pressable>
  </Link>
)

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grey[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    flex: 1,
    rowGap: 4,
  },
})

export default SupportItem
