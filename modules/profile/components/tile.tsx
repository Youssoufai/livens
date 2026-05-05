import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import { Link } from 'expo-router'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'

import { TileProps } from '../profile.types'

const Tile = ({
  title,
  description,
  type,
  icon,
  isEnabled,
  link,
  onPress,
  hasBorder = true,
  textColor,
}: TileProps) => {
  const Icon = icon

  const content = (
    <TouchableOpacity activeOpacity={0.7}>
      <View
        style={[
          styles.mainContent,
          hasBorder && {
            borderBottomWidth: 1,
            borderBottomColor: '#0000001A',
          },
        ]}
      >
        <View style={styles.iconWrapper}>
          {<Icon height={24} width={24} />}
        </View>
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
        <ChevronRight size={24} color={COLORS.grey[200]} />
      </View>
    </TouchableOpacity>
  )

  return link ? (
    <Link href={link} asChild>
      {content}
    </Link>
  ) : (
    <Pressable onPress={onPress}>{content}</Pressable>
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
