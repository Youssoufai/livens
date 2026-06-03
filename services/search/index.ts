import { API_ENDPOINTS } from '@/constants/endpoints'
import { SearchResultItem } from '@/modules/search/search.types'

import { AuthenticatedAPI } from '..'

export const getSearchResults = async (query: string): Promise<SearchResultItem[]> => {
  try {
    const { data } = await AuthenticatedAPI.post(
      API_ENDPOINTS.search.occassion,
      { search: query }
    )

    return (data.data ?? []) as SearchResultItem[]
  } catch (error) {
    throw error
  }
}
