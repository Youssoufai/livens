import { Href } from 'expo-router'
import { ReactElement, ReactNode } from 'react'
import { ViewStyle } from 'react-native'
import { QueryKey } from '@tanstack/react-query'

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

export type OutgoingStatusColorType = {
  label: string
  color: string
  bgColor: string
  btnColor: string
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

export interface BrowseRequestCardProps {
  id: string
  name: string
  description: string
  profilePhoto?: string
  reward: number | string
  duration: string
  userLat?: number
  userLon?: number
  location?: string
  longitude: number
  latitude: number
  requesterLocation: string
  createdAt: string
  onPress: (id: string) => void
}

export interface OutgoingRequestCardProps {
  id?: string
  status?: Partial<RequestStatusType>
  title: string | Omit<LocationType, 'formattedAddress'>
  description: string
  onAddResponse?: (id: string) => void
  onEditResponse?: (id: string) => void
  onWithdrawResponse: (id: string) => void
  onMessage: (userId: string) => void
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

export interface BrowseRequestListProps {
  data: RequestData[]
  isLoading: boolean
  refreshing: boolean
  onRefresh: (keys: QueryKey[]) => void
  userLat?: number
  userLon?: number
}

export interface OutgoingRequestListProps {
  data: RequestData[]
  isLoading: boolean
  refreshing: boolean
  onRefresh: (keys: QueryKey[]) => void
}

export interface RequestListProps {
  list?: RequestData[]
  onViewResponders: (id: string) => void
  isLoading: boolean
  refreshing: boolean
  onRefresh: (keys: QueryKey[]) => void
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

export interface RequestEmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  buttonLabel?: string
  onPress?: VoidFunction
}

export interface OfferPreviewProps {
  count: number
  hasUser?: boolean
  avatarUris?: string[]
}

export type RequestSuccessModalType = 'request_completed' | 'rating' | 'boost'
