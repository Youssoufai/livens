import { useMutation, useQuery } from '@tanstack/react-query'

import { REQUESTS_TABS } from '@/modules/request/requests.data'

import {
  respondToRequest,
  submitRequestResponse,
} from '../../services/response'
import { queryClient } from '../../services'

export const useRespondToRequest = (requestId: string) => {
  return useMutation({
    mutationFn: () => respondToRequest(requestId),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['all-requests', REQUESTS_TABS[0].value],
        }),
        queryClient.invalidateQueries({
          queryKey: ['all-requests', REQUESTS_TABS[2].value],
        }),
      ])
    },
  })
}

export const useSubmitResponseMutation = (requestId: string) => {
  return useMutation({
    mutationFn: submitRequestResponse,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['all-requests', REQUESTS_TABS[1].value],
        }),
        queryClient.invalidateQueries({
          queryKey: ['sent-offers'],
        }),
      ])
    },
  })
}
