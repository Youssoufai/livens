import { FONTS } from '@/constants/fonts'
import { ReactNode } from 'react'
import { TextStyle, ViewStyle } from 'react-native'

export type ColorType =
  | 'primary-50'
  | 'primary-100'
  | 'primary-200'
  | 'primary-300'
  | 'primary-400'
  | 'primary-500'
  | 'yellow-100'
  | 'yellow-200'
  | 'yellow-300'
  | 'yellow-400'
  | 'yellow-500'
  | 'green-100'
  | 'green-200'
  | 'green-300'
  | 'green-400'
  | 'green-500'
  | 'grey-100'
  | 'grey-200'
  | 'grey-300'
  | 'grey-400'
  | 'grey-500'
  // | "grey-700"
  | 'grey-800'
  // | "grey-900"
  // | "grey-dark"
  | 'white'
  | 'danger'

export interface TextProps {
  nativeId?: string
  color?: ColorType
  size?: number
  lineHeight?: number
  fontFamily?: keyof typeof FONTS
  weight?: 400 | 500 | 700 | 900
  align?: TextStyle['textAlign']
  style?: TextStyle | (TextStyle | undefined)[]
  children: ReactNode
}

export interface ProgressBarProps {
  progress: number
  color?: string
  containerStyle?: ViewStyle
}
