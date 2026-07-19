import { useQuery } from '@tanstack/react-query'

import {
  getAllRequests,
  getBrowseRequests,
  getRequestById,
  getRequestResponders,
  getRequests,
  getResponseStatus,
} from '@/services/requests'
import { REQUESTS_TABS } from '@/modules/request/requests.data'

export const useGetAllRequestsQuery = (type: string) =>
  useQuery({
    queryKey: ['all-requests', type],
    queryFn: () => getAllRequests(type),
    enabled: type !== REQUESTS_TABS[0].value.toString(),
  })

export const useGetBrowseRequestsQuery = (type: string) =>
  useQuery({
    queryKey: ['browse-requests'],
    queryFn: getBrowseRequests,
    enabled: type === REQUESTS_TABS[0].value.toString(),
  })

export const useGetRequestsQuery = (type: string) => {
  return useQuery({
    queryKey: ['requests', type],
    queryFn: () => getRequests(type),
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
