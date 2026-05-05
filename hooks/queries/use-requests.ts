import { useQuery } from '@tanstack/react-query'

import {
  getRequestById,
  getRequestResponders,
  getRequests,
  getResponseStatus,
} from '@/services/requests'

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

export const useGetRequestResponders = (requestId: string) => {
  return useQuery({
    queryKey: ['request-responders', requestId],
    queryFn: () => getRequestResponders(requestId),
  })
}

export const useGetResponseStatus = (requestId: string) =>
  useQuery({
    queryKey: ['request-status', requestId],
    queryFn: () => getResponseStatus(requestId),
  })
