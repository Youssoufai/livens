import { StyleSheet } from 'react-native'

import { FONTS } from '@/constants/fonts'
import { COLORS } from '@/constants/theme'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'

export const globalStyles = StyleSheet.create({
  pressedOpacity: {
    opacity: 0.75,
  },
  screenHeaderContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
})

export const phoneStyles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    columnGap: 8,
    borderWidth: 0,
    marginBottom: 10,
  },
  flagContainer: {
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 4,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    height: 52,
  },
  callingCode: {
    fontSize: actuateFontSize(16),
    fontFamily: FONTS.dm_sans[400],
    lineHeight: actuateLineHeight(16, 24),
    color: COLORS.grey[500],
  },
  divider: {
    display: 'none',
  },
  caret: {
    display: 'none',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 4,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    color: COLORS.grey[800],
    fontSize: actuateFontSize(16),
    lineHeight: actuateLineHeight(16, 24),
    fontFamily: FONTS.dm_sans[400],
    height: 52,
  },
})

export const phoneModalStyles = StyleSheet.create({
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 4,
    color: COLORS.grey[800],
    fontSize: actuateFontSize(16),
    lineHeight: actuateLineHeight(16, 24),
    fontFamily: FONTS.dm_sans[400],
  },
  callingCode: {
    fontSize: actuateFontSize(16),
    fontFamily: FONTS.dm_sans[400],
    lineHeight: actuateLineHeight(16, 24),
    color: COLORS.grey[700],
  },
  countryName: {
    fontSize: actuateFontSize(16),
    fontFamily: FONTS.dm_sans[400],
    lineHeight: actuateLineHeight(16, 24),
    color: COLORS.grey[700],
  },
  countryItem: {
    backgroundColor: COLORS.white,
  },
})
