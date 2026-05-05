import { isValidElement, ReactElement, ReactNode } from 'react'
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import BackButton from '@/components/back-button'
import { COLORS } from '@/constants/theme'

import Text from './text'

export const CustomHeader = ({
  title,
  showBack,
  backFunc,
  icon,
  moreInfo,
  containerStyle,
  titleStyle,
  contentStyle,
  leftContentStyle,
  rightContentStyle,
}: {
  title?: ReactNode
  showBack?: boolean
  backFunc?: VoidFunction
  icon?: ReactElement
  moreInfo?: ReactNode
  containerStyle?: ViewStyle
  titleStyle?: TextStyle
  contentStyle?: ViewStyle
  leftContentStyle?: ViewStyle
  rightContentStyle?: ViewStyle
}) => {
  const top = useSafeAreaInsets().top

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top + 12,
        },
        containerStyle,
      ]}
    >
      <View style={[styles.content, contentStyle]}>
        {showBack && (
          <View
            style={[styles.arrow, styles.alignVertically, leftContentStyle]}
          >
            <BackButton icon={icon} routingFunc={backFunc} />
          </View>
        )}
        {isValidElement(title) ? (
          title
        ) : (
          <Text
            size={16}
            lineHeight={24}
            weight={500}
            style={[styles.title, styles.stringedTitle, titleStyle]}
          >
            {title}
          </Text>
        )}
        <View
          style={[{ right: 16 }, styles.alignVertically, rightContentStyle]}
        >
          {moreInfo}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },

  title: {
    flex: 1,
    textTransform: 'capitalize',
  },
  stringedTitle: {
    paddingLeft: 44,
  },
  link: {},
  alignVertically: {
    position: 'absolute',
    zIndex: 10,
  },
  arrow: {
    // paddingLeft: 10,
    left: 16,
  },
})
