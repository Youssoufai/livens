import { API_ENDPOINTS } from '@/constants/endpoints'
import { SearchResultItem } from '@/modules/search/search.types'

import { AuthenticatedAPI } from '..'

export const getSearchResults = async (query: {
  location?: LocationType
  period?: string
}): Promise<SearchResultItem[]> => {
  try {
    const { data } = await AuthenticatedAPI.get(
      API_ENDPOINTS.search.occassion,
      {
        params: {
          longitude: query.location?.longitude,
          latitude: query.location?.latitude,
          period: query.period,
        },
      }
    )

    return (data ?? []) as SearchResultItem[]
  } catch (error) {
    throw error
  }
}

export const getSearchDetails = async (
  id: string
): Promise<SearchResultItem> => {
  try {
    const { data } = await AuthenticatedAPI.get(
      API_ENDPOINTS.search.getDetails(id)
    )

    return data as SearchResultItem
  } catch (error) {
    throw error
  }
}
