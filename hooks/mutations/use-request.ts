import { useMutation } from '@tanstack/react-query'

import {
  approveRequestResponder,
  cancelRequest,
  completeRequest,
  createRequest,
  editRequest,
  makeRequestPublic,
  withdrawResponder,
} from '@/services/requests'
import { queryClient } from '@/services'
import {
  RequestPayload,
  RequestResponderPayload,
} from '@/services/requests/request.types'
import { REQUESTS_TABS } from '@/modules/request/requests.data'

export const useCreateRequestMutation = () => {
  return useMutation({
    mutationFn: createRequest,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['all-requests', REQUESTS_TABS[2].value],
      })
    },
  })
}

export const useEditRequestMutation = (id: string) => {
  return useMutation({
    mutationFn: (payload: RequestPayload) =>
      editRequest({ request_id: id, ...payload }),
    onSuccess() {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['all-requests', REQUESTS_TABS[2].value],
        }),
        queryClient.invalidateQueries({ queryKey: ['request', id] }),
      ])
    },
  })
}

export const useApproveRequestResponder = (id: string) => {
  return useMutation({
    mutationFn: (payload: RequestResponderPayload) =>
      approveRequestResponder(payload),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['requests'] }),
        queryClient.invalidateQueries({
          queryKey: ['request-responders', id],
        }),
        queryClient.invalidateQueries({ queryKey: ['request', id] }),
        queryClient.invalidateQueries({ queryKey: ['request-status', id] }),
      ])
    },
  })
}

export const useMakeRequestPublicMutation = (id: string) => {
  return useMutation({
    mutationFn: makeRequestPublic,
    onSuccess: () => {},
  })
}

export const useCompleteRequest = (id: string) => {
  return useMutation({
    mutationFn: () => completeRequest(id),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['all-requests', REQUESTS_TABS[2].value],
        }),
        queryClient.invalidateQueries({
          queryKey: ['request-responders', id],
        }),
        queryClient.invalidateQueries({ queryKey: ['request', id] }),
        queryClient.invalidateQueries({ queryKey: ['request-status', id] }),
      ])
    },
  })
}

export const useWithdrawResponderMutation = (id: string) => {
  return useMutation({
    mutationFn: withdrawResponder,
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['all-requests', REQUESTS_TABS[2].value],
        }),
        queryClient.invalidateQueries({ queryKey: ['request', id] }),
        queryClient.invalidateQueries({
          queryKey: ['request-responders', id],
        }),
        queryClient.invalidateQueries({ queryKey: ['request-status', id] }),
      ])
    },
  })
}

export const useCancelRequestMutation = () => {
  return useMutation({
    mutationFn: cancelRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['all-requests', REQUESTS_TABS[2].value],
      })
    },
  })
}
