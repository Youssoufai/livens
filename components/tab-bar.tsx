import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { PlatformPressable } from '@react-navigation/elements'
import { useLinkBuilder } from '@react-navigation/native'
import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { COLORS } from '@/constants/theme'
import { actuateNormalize } from '@/utils/normalize'

import Text from './text'

function TabBar({
  icons,
  state,
  descriptors,
  navigation,
}: {
  icons: (focused: boolean) => Record<string, ReactNode>
} & BottomTabBarProps) {
  const { buildHref } = useLinkBuilder()
  const bottom = useSafeAreaInsets().bottom

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = options.title !== undefined ? options.title : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        const icon = icons(isFocused)[route.name]

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            pressColor={COLORS.grey[200]}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
            key={label}
          >
            {icon}

            <Text
              color={isFocused ? 'green-500' : 'grey-700'}
              size={12}
              weight={700}
              style={styles.tabLabel}
            >
              {label}
            </Text>
          </PlatformPressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 10,
  },
  tabItem: {
    alignItems: 'center',
    gap: 4,
    borderRadius: 60,
    paddingVertical: 7,
    paddingHorizontal: actuateNormalize(15, 'height'),
    overflow: 'hidden',
  },
  tabLabel: {
    textTransform: 'capitalize',
  },
})

export default TabBar
