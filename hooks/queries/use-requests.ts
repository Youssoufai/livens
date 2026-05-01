import { useQuery } from '@tanstack/react-query'

import { getRequestById, getRequests } from '@/services/requests'

export const useGetRequestsQuery = () => {
  return useQuery({
    queryKey: ['requests'],
    queryFn: getRequests,
  })
}

export const useGetRequestByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['requests', id],
    queryFn: () => getRequestById(id),
  })
}
