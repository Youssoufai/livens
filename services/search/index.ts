import { API_ENDPOINTS } from '@/constants/endpoints'
import { AuthenticatedAPI } from '..'

export const getSearchResults = async (query: string) => {
  try {
    const { data } = await AuthenticatedAPI.post(
      API_ENDPOINTS.search.occassion,
      { search: query }
    )

    return data.data
  } catch (error) {
    throw Error(error as any)
  }
}
