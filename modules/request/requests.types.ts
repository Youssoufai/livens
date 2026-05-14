import { Href } from 'expo-router'
import { ReactElement, ReactNode } from 'react'
import { ViewStyle } from 'react-native'

import {
  RequestData,
  RequestStatusType,
  RespondersType,
} from '@/services/requests/request.types'

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
  status?: Partial<RequestStatusType>
  title: string | Omit<LocationType, 'formattedAddress'>
  description: string
  buttonText?: string
  onPress?: (id: string) => void
  onCancelRequest?: (id: string) => void
}

export interface ResponseCardProps {
  id: string
  responder: string
  location: string
  starRating: number
  requestCompleted: number
  isLoading?: boolean
  selected?: string
  isApproved?: boolean
  onApprove: (id: string, name: string) => void
}

export interface RequestListProps {
  list?: RequestData[]
  onViewResponders: (id: string) => void
}

export interface ResponderListProps {
  requestId: string
  isLoading: boolean
  data?: RespondersType[]
  onGotoStatus: VoidFunction
}

export interface RequestCompleteContentProps {
  responder: string
  onDismissModal: VoidFunction
  onRateResponder: VoidFunction
}

export type RequestSuccessModalContentType = {
  title: string
  description: string
  icon: ReactElement
  content: ReactNode
}

export interface RatingContentProps {
  userId: string
  responderName: string
  onDismissModal: VoidFunction
}

export type RequestSuccessModalType = 'request_completed' | 'rating' | 'boost'
