import { ReactNode } from 'react'
import { TextStyle, ViewStyle } from 'react-native'
import { OtpInputProps } from 'react-native-otp-entry'

import { FONTS } from '@/constants/fonts'

export type ColorType =
  | 'primary-50'
  | 'primary-100'
  | 'primary-200'
  | 'primary-300'
  | 'primary-400'
  | 'primary-500'
  | 'primary-600'
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
  | 'grey-700'
  | 'grey-800'
  // | "grey-900"
  // | "grey-dark"
  | 'white'
  | 'danger'
  | 'black'

export interface TextProps {
  nativeId?: string
  color?: ColorType
  size?: number
  lineHeight?: number
  fontFamily?: keyof typeof FONTS
  weight?: 400 | 500 | 600 | 700
  align?: TextStyle['textAlign']
  style?: TextStyle | (TextStyle | undefined)[]
  children: ReactNode
}

export interface ProgressBarProps {
  progress: number
  color?: string
  containerStyle?: ViewStyle
}

export interface PasswordInputProps {
  name: string
  control: any
  label: string
  addPadding?: boolean
  hasFormError?: boolean
  placeholder: string
  error?: string
}

export interface OTPEntryProps {
  inputNumber?: number
  secureEntry?: boolean
  onChange?: (value: string) => void
  onFilled?: (value: string) => void
  type?: OtpInputProps['type']
  error?: string
}

export interface CheckboxProps {
  label: string
  checked: boolean
  alignLabel?: 'left' | 'right'
  onPress: VoidFunction
}
