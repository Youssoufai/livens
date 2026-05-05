import { Href } from 'expo-router'
import { ReactElement } from 'react'
import { ViewStyle } from 'react-native'

import { RequestData } from '@/services/requests/request.types'

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
  containerStyle?: ViewStyle
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
  onPress?: (id: string) => void
}

export interface ResponseCardProps {
  id: string
  responder: string
  location: string
  starRating: number
  requestCompleted: number
  isLoading?: boolean
  onApprove: (id: string, name: string) => void
}

export interface RequestListProps {
  list?: RequestData[]
  onViewResponders: (id: string) => void
}

export interface ResponderListProps {
  requestId: string
  onGotoStatus: VoidFunction
}

export type RequestSuccessModalType = 'request_completed' | 'rating' | 'boost'
