import { useQuery } from '@tanstack/react-query'

import { getOffersList, getSentOfferList } from '@/services/response'

export const useGetOfferListQuery = (requestId: string) => {
  return useQuery({
    queryKey: ['offers-sent', requestId],
    queryFn: () => getOffersList(requestId),
  })
}

export const useGetSentOfferListQuery = (type: string) => {
  return useQuery({
    queryKey: ['sent-offers', type],
    queryFn: () => getSentOfferList(type),
  })
}
