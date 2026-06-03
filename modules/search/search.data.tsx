import { Image } from 'react-native'

import {
  OptionType,
  SearchDateFilter,
  SearchHasResponsesFilter,
  SearchSortFilter,
} from './search.types'

export const HOME_OPTIONS: OptionType[] = [
  {
    title: 'Search a place',
    description: 'See the most recent news and updates about a place.',
    icon: () => (
      <Image
        source={require('@/assets/images/place-search.png')}
        resizeMode="contain"
        style={{ width: 45, height: 45 }}
      />
    ),
    link: '/(search)/search-result',
  },
  {
    title: 'Ask the public',
    description:
      "Get answers from locals about what's happening in a location.",
    icon: () => (
      <Image
        source={require('@/assets/images/chat-bubble.png')}
        resizeMode="contain"
        style={{ width: 45, height: 45 }}
      />
    ),
    link: '/(requests)/create-request',
  },
  {
    title: 'See nearby requests',
    description: 'Earn fast cash by responding to nearby requests',
    icon: () => (
      <Image
        source={require('@/assets/images/earn.png')}
        style={{ width: 45, height: 45 }}
      />
    ),
    link: '/(tabs)/requests',
  },
]

export const searchFilterOptions = [
  { label: 'Date posted', value: 'date-posted' },
  { label: 'Sort by', value: 'sort' },
  { label: 'Has responses?', value: 'has-responses' },
]

export const DATE_FILTER_OPTIONS: {
  label: string
  shortLabel: string
  value: SearchDateFilter
}[] = [
  { label: 'Posted Anytime', shortLabel: 'Anytime', value: 'anytime' },
  {
    label: 'Posted in the last 24 hours',
    shortLabel: 'Last 24 hours',
    value: 'last-24h',
  },
  {
    label: 'Posted in the last week',
    shortLabel: 'Last week',
    value: 'last-week',
  },
  {
    label: 'Posted in the last month',
    shortLabel: 'Last month',
    value: 'last-month',
  },
]

export const HAS_RESPONSES_OPTIONS: {
  label: string
  value: SearchHasResponsesFilter
}[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
]

export const SORT_OPTIONS: { label: string; value: SearchSortFilter }[] = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' },
]
