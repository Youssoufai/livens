import { Href } from 'expo-router'
import { ReactElement } from 'react'

import { MediaType } from '@/services/requests/request.types'

export type OptionType = {
  title: string
  description: string
  icon: () => ReactElement
  link?: Href
}

export type SearchDateFilter = 'anytime' | 'last-24h' | 'last-week' | 'last-month'
export type SearchHasResponsesFilter = 'yes' | 'no'
export type SearchSortFilter = 'newest' | 'oldest'

export type SearchFilters = {
  datePosted?: SearchDateFilter
  sort?: SearchSortFilter
  hasResponses?: SearchHasResponsesFilter
}

export type SearchFilterProps = {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
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
  location: string
  created_at: string
  views?: number
  saves?: number
  user: User
  responses?: SearchResponseItem[]
}
