import { Href } from 'expo-router'
import { Dispatch, ReactElement, SetStateAction } from 'react'

import { MediaType } from '@/services/requests/request.types'
import { LucideIcon } from 'lucide-react-native'

export type OptionType = {
  title: string
  description: string
  icon: () => ReactElement
  link?: Href
}

export type SearchDateFilter =
  | 'anytime'
  | 'last-24h'
  | 'last-week'
  | 'last-month'
export type SearchHasResponsesFilter = 'yes' | 'no'
export type SearchSortFilter = 'newest' | 'oldest'

export type SearchFilters = {
  datePosted?: SearchDateFilter
  sort?: SearchSortFilter
}

export type SearchFilterProps = {
  filters: SearchFilters
  onFiltersChange: Dispatch<SetStateAction<SearchFilters>>
}

export type SearchResponseItem = {
  id: string
  comment: string
  media_paths: MediaType[]
  user: User
  created_at: string
}

export type SearchResultItem = {
  id: string
  description: string
  duration: string
  location: string
  created_at: string
  views?: number
  saves?: number
  user: User
  responder: User
  response?: SearchResponseItem
}

export type SearchResultCardProps = {
  description: string
  location: string
  user: User
  responderName?: string
  responderCreatedAt?: string
  responderComment?: string
  responderMediaPaths?: MediaType[]
  onPress: () => void
}

export interface PostActionRowProps {
  icon: LucideIcon
  value: string
}

export interface SortFilterProps {
  value: string
  onChange: (value: string) => void
}

export interface DatePostedFilterProps {
  value: string
  onChange: (value: string) => void
}

export interface FilterSheetProps {
  isVisible: boolean
  activeSheet: keyof SearchFilters
  sortValue: string
  datePostedValue: string
  onDatePostedChange: (type: string) => void
  onSortChange: (type: string) => void
  onCloseSheet: VoidFunction
}
