import { Href } from 'expo-router'
import { FC, FunctionComponent } from 'react'
import { SvgProps } from 'react-native-svg'

export interface TileProps {
  type?: string
  isEnabled?: boolean
  title: string
  description?: string
  textColor?: string
  actionValue?: string
  icon: FunctionComponent<SvgProps>
  link?: Href
  hasBorder?: boolean
  onPress?: VoidFunction
}

export type ProfileDataType = {
  title: string
  description: string
  icon: FC<SvgProps>
  link?: Href
}

export type FaqSection = {
  title: string
  items: FaqItem[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface NotificationState {
  pushRequest: boolean
  pushEarnings: boolean
  pushOffers: boolean
  emailRequest: boolean
  emailEarnings: boolean
  emailOffers: boolean
}

export type NotifRowProps = {
  label: string
  description: string
  value: boolean
  onToggle: (val: boolean) => void
}

export type SupportItemProps = {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

export interface ProfilePhotoProps {
  setImage: (image: FileType) => void
  image?: string
}

export interface WithdrawSheetProps {
  isVisible: boolean
  type: string
  onCloseSheet: VoidFunction
}

export interface AccountOptionProps {
  id: string
  bankName: string
  accountNumber: string
  isSelected: boolean
  isDefault: boolean
  onSelect: (id: string) => void
}
