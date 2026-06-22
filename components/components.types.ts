import { ReactElement, ReactNode } from 'react'
import { DimensionValue, TextStyle, ViewStyle } from 'react-native'
import { OtpInputProps } from 'react-native-otp-entry'
import { ExternalPathString, Href, RelativePathString } from 'expo-router'
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { BackdropPressBehavior } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'

import { FONTS } from '@/constants/fonts'
import { MediaType } from '@/services/requests/request.types'

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
  | 'green-50'
  | 'green-100'
  | 'green-200'
  | 'green-300'
  | 'green-400'
  | 'green-500'
  | 'green-600'
  | 'grey-100'
  | 'grey-200'
  | 'grey-300'
  | 'grey-400'
  | 'grey-500'
  | 'grey-600'
  | 'grey-700'
  | 'grey-800'
  // | "grey-900"
  // | "grey-dark"
  | 'red-500'
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
  numberOfLines?: number
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
  onPress: (checked?: boolean) => void
}

export interface ActionRowProps {
  isEnabled?: boolean
  title: string
  description?: string
  textColor?: string
  actionValue?: string
  icon: () => ReactElement
  link?: Href | RelativePathString | ExternalPathString
  hasBorder?: boolean
  onPress?: VoidFunction
}

export interface CustomBottomSheetProps {
  portalName?: string
  children: ReactNode
  title?: ReactNode
  description?: ReactNode
  index?: number
  alignIcon?: 'right' | 'left'
  lastIndex?: number
  snapPoints: (string | number)[]
  isVisible: boolean
  backdropComponent?: (props: BottomSheetBackdropProps) => ReactElement
  backdropPress?: BackdropPressBehavior
  backdropOpacity?: number
  backgroundColor?: string
  disappearsOnIndex?: number
  onClose?: VoidFunction
  enableDynamicSizing?: boolean
  enablePanDownToClose?: boolean
  showIndicator?: boolean
  hideCloseIcon?: boolean
}

export interface ScreenLoaderProps {
  isLoading: boolean
  content?: ReactNode
}

export interface SearchInputProps {
  value: string
  placeholder?: string
  focusable?: boolean
  suggestions?: string[]
  onChangeText: (text: string) => void
  onClear: () => void
  onSelectSuggestion?: (item: string) => void
}

export interface LocationInputProps {
  defaultValue?: string
  defaultCoords?: LocationType
  placeholder?: string
  label?: string
  enableScroll?: boolean
  labelStyle?: TextStyle
  inputContainerStyle?: ViewStyle
  onLocation: (values: LocationType) => void
}

export interface SearchModalProps {
  placeholder?: string
  onChangeOption?: (value?: string) => void
  onSelect?: (value: string) => void
}

export interface SuccessModalProps {
  isOpen: boolean
  title: string
  description: string
  icon: ReactElement
  bottomContent?: ReactNode
  onDismiss?: VoidFunction
  contentStyle?: ViewStyle
}

export interface NoticeProps {
  show?: boolean
  content: ReactNode
  type?: 'success' | 'error' | 'info'
  containerStyle?: ViewStyle
  textStyle?: TextStyle
}

export interface MediaDisplayProps {
  selectedMedia: MediaType | null
  onDismiss: VoidFunction
  canSaveMedia?: boolean
}

export interface StepTransitionProps {
  direction: Direction
}

export interface TooltipProps {
  content: ReactNode
}

export interface InputMeasure {
  x: number
  y: number
  width: number
  height: number
}

export interface ToggleGroupProps {
  groupList: ListItem[]
  onSelect: (value: string) => void
  containerStyle?: ViewStyle
  buttonStyle?: ViewStyle
  labelStyle?: TextStyle
}

export interface SkeletonLoaderProps {
  children?: ReactNode
  isLoading?: boolean
  height?: DimensionValue
  style?: ViewStyle
}

export interface VideoProps {
  source: string
  play?: VoidFunction
  pause?: VoidFunction
  allowFullScreen?: boolean
  style?: ViewStyle
  videoStyle?: ViewStyle
}

export interface RadioGroupProps {
  name?: string
  list: ListItem[]
  value: string
  onValueChange: (value: string) => void
}
