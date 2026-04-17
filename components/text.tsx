import { useMemo } from 'react'
import { Text as RNText, StyleSheet } from 'react-native'

import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
import { getResolvedColor } from '@/utils/resolver'
import { FONTS } from '@/constants/fonts'

import { TextProps } from './components.types'

const Text = ({
  size = 16,
  lineHeight,
  fontFamily = 'satoshi',
  weight = 400,
  children,
  color = 'grey-800',
  align,
  style,
}: TextProps) => {
  const customFontProps = useMemo(() => {
    let selectedFont = FONTS.satoshi[400]
    if (fontFamily === 'satoshi' && weight in FONTS.satoshi) {
      selectedFont = (FONTS.satoshi as Record<number, string>)[weight]
    } else if (fontFamily === 'inter' && weight in FONTS.inter) {
      selectedFont = (FONTS.inter as Record<number, string>)[weight]
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
