import { StyleSheet, View, TouchableOpacity } from 'react-native'

import { ChevronRight } from 'lucide-react-native'
import { useRouter } from 'expo-router'

import { COLORS } from '@/constants/theme'

import { ActionRowProps } from './components.types'
import Text from './text'

const ActionRow = ({
  title,
  description,
  textColor,
  icon,
  link,
  isEnabled,
  onPress,
}: ActionRowProps) => {
  const router = useRouter()

  const content = (
    <TouchableOpacity
      style={styles.option}
      activeOpacity={0.75}
      onPress={onPress || (() => link && router.push(link))}
    >
      <View style={styles.iconCircle}>{icon()}</View>
      <View style={styles.optionText}>
        <Text
          size={14}
          lineHeight={20}
          weight={600}
          color="black"
          style={{ color: textColor }}
        >
          {title}
        </Text>
        <Text
          size={14}
          lineHeight={20}
          color="grey-400"
          style={{ color: textColor }}
        >
          {description}
        </Text>
      </View>
      <ChevronRight size={20} color={COLORS.grey[100]} />
    </TouchableOpacity>
  )

  return content
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 0.8,
    borderColor: COLORS.grey[50],
    columnGap: 16,
  },
  iconCircle: {},
  optionText: {
    flex: 1,
    rowGap: 4,
  },
})

export default ActionRow
