import { useQuery } from '@tanstack/react-query'

import { getSearchDetails, getSearchResults } from '@/services/search'

export const useSearchQuery = (query: {
  location?: LocationType
  period?: string
}) => {
  return useQuery({
    queryKey: ['search-request', query.location],
    queryFn: () => getSearchResults(query),
    enabled: !!query.location,
  })
}

export const useGetSearchDetails = (id: string) => {
  return useQuery({
    queryKey: ['search-details', id],
    queryFn: () => getSearchDetails(id),
  })
}
