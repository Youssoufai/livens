import { useMutation } from '@tanstack/react-query'

import { REQUESTS_TABS } from '@/modules/request/requests.data'

import {
  editRequestResponse,
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
        queryClient.invalidateQueries({ queryKey: ['request', requestId] }),
        queryClient.invalidateQueries({ queryKey: ['offers-sent', requestId] }),
      ])
    },
  })
}

export const useSubmitResponseMutation = () => {
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

export const useEditResponseMutation = (requestId: string) => {
  return useMutation({
    mutationFn: editRequestResponse,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['request-status', requestId],
        }),
        queryClient.invalidateQueries({
          queryKey: ['sent-offers'],
        }),
      ])
    },
  })
}
