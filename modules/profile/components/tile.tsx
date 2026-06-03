import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import { Link } from 'expo-router'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import Switch from '@/components/ui/switch'

import { TileProps } from '../profile.types'

const Tile = ({
  title,
  description,
  type,
  icon,
  isEnabled,
  link,
  onPress,
  onToggle,
  hasBorder = true,
  textColor,
}: TileProps) => {
  const Icon = icon

  const content = (
    <View
      style={[
        styles.mainContent,
        hasBorder && {
          borderBottomWidth: 1,
          borderBottomColor: '#0000001A',
        },
      ]}
    >
      <View style={styles.iconWrapper}>{<Icon height={24} width={24} />}</View>
      <View style={styles.textWrapper}>
        <Text size={16} lineHeight={20} color="black" weight={600}>
          {title}
        </Text>
        {description && (
          <Text size={14} lineHeight={20} color="grey-400">
            {description}
          </Text>
        )}
      </View>
      {onToggle ? (
        <Switch
          value={isEnabled}
          onValueChange={onToggle}
          trackColor={COLORS.primary[500]}
          thumbColor={COLORS.white}
        />
      ) : (
        <ChevronRight size={24} color={COLORS.grey[200]} />
      )}
    </View>
  )

  return onToggle ? (
    content
  ) : link ? (
    <Link href={link} asChild>
      <TouchableOpacity activeOpacity={0.7}>{content}</TouchableOpacity>
    </Link>
  ) : (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
      onPress={onPress}
    >
      {content}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  touchableWrapper: {},
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 12,
    paddingHorizontal: 0,
    paddingVertical: 14,
  },
  iconWrapper: {
    alignSelf: 'stretch',
  },
  textWrapper: {
    flex: 1,
    rowGap: 5,
  },
  title: {},

  pellet: {
    backgroundColor: '#F2F3FC',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  pelletText: {},
})

export default Tile
