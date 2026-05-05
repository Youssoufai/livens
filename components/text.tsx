import { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Text as RNText } from 'react-native-paper'

import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
import { getResolvedColor } from '@/utils/resolver'
import { FONTS } from '@/constants/fonts'

import { TextProps } from './components.types'

const Text = ({
  size = 16,
  lineHeight,
  fontFamily = 'dm_sans',
  weight = 400,
  children,
  color = 'grey-800',
  align,
  style,
}: TextProps) => {
  const customFontProps = useMemo(() => {
    let selectedFont = FONTS.dm_sans[400]
    if (fontFamily === 'dm_sans' && weight in FONTS.dm_sans) {
      selectedFont = (FONTS.dm_sans as Record<number, string>)[weight]
    }

    return {
      fontSize: size ? actuateFontSize(size) : undefined,
      lineHeight: lineHeight ? actuateLineHeight(size, lineHeight) : undefined,
      fontFamily: selectedFont,
      textAlign: align,
      color: getResolvedColor(color),
    }
  }, [align, color, size, fontFamily, lineHeight, weight])

  return <RNText style={[customFontProps, style]}>{children}</RNText>
}

const styles = StyleSheet.create({})

export default Text
