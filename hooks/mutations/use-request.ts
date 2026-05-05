import { useMutation } from '@tanstack/react-query'

import { approveRequestResponder, createRequest } from '@/services/requests'
import { queryClient } from '@/services'
import { RequestResponderPayload } from '@/services/requests/request.types'

export const useCreateRequestMutation = () => {
  return useMutation({
    mutationFn: createRequest,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
    },
  })
}

export const useApproveRequestResponder = (id: string) => {
  return useMutation({
    mutationFn: (payload: RequestResponderPayload) =>
      approveRequestResponder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['request-responders', id],
      })
    },
  })
}
