import { ReactElement } from 'react'
import { TextStyle, ViewStyle } from 'react-native'

import { ColorType } from '../components.types'
import { StatusBarStyle } from 'expo-status-bar'

export interface BtnProps {
  icon?: ReactElement
  label: string
  onPress: VoidFunction
  btnStyle?: ViewStyle
  contentStyle?: ViewStyle
  labelStyle?: TextStyle
  alignIcon?: 'left' | 'right'
  loading?: boolean
  disabled?: boolean
  labelColor?: ColorType
  buttonColor?: ColorType
  disabledColor?: string
  disabledTextColor?: ColorType
  loaderColor?: string
}

export interface InputPropType {
  type?: 'plain' | 'paper'
  label?: string
  placeholder?: string
  control?: any
  name?: string
  value?: string
  defaultValue?: string
  maxLength?: number
  error?: string
  hasFormError?: boolean
  disabled?: boolean
  addBottomPadding?: boolean
  isBottomSheet?: boolean
  style?: ViewStyle
  labelStyle?: TextStyle
  containerStyle?: ViewStyle
  inputFieldStyle?: ViewStyle
  onPress?: VoidFunction
  formatter?: (value: string) => string
}

export interface Modalprops {
  visible: boolean
  fullHeight?: boolean
  modalStyle?: ViewStyle
  contentStyle?: ViewStyle
  statusBarStyle?: StatusBarStyle
  onDismiss?: VoidFunction
  showCloseButton?: boolean
}

export interface SwitchProps {
  value?: boolean
  onValueChange?: (value: boolean) => void
  trackColor: string
  thumbColor: string
}
