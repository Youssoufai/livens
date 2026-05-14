import { useQuery } from '@tanstack/react-query'

import {
  getRequestById,
  getRequestResponders,
  getRequests,
  getResponseStatus,
} from '@/services/requests'

export const useGetRequestsQuery = (type: string) => {
  return useQuery({
    queryKey: ['requests'],
    queryFn: getRequests,
    enabled: type === 'my-request',
  })
}

export const useGetRequestByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['request', id],
    queryFn: () => getRequestById(id),
    enabled: !!id,
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
