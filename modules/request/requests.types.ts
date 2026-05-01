import { Href } from 'expo-router'
import { ReactElement } from 'react'

export type OptionType = {
  title: string
  description: string
  icon: () => ReactElement
  link?: Href
}

export interface HeaderTabProps {
  list: ListItem[]
  selected: string
  onSelect: (value: string) => void
}

export interface CreateRequestData {
  location: string
  description: string
  duration: string
  allowComment: boolean
  reward: number
}

export interface RewardOptionProps {
  id: string
  isPopular: boolean
  title: string
  description: string
  isSelected: boolean
  disabled?: boolean
  onSelect?: (id: string) => void
}

export interface PaymentDetailsProps {
  amount: number
  value: string
  onValueChange: (value: string) => void
}

export interface RequestCardProps {
  id?: string
  status?: string
  title: string
  description: string
  buttonText?: string
  onPress?: (id?: string) => void
}
