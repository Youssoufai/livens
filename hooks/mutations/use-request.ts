import { useMutation } from '@tanstack/react-query'

import { createRequest } from '@/services/requests'
import { CreateRequestFormData } from '@/state/request/request.types'
import { queryClient } from '@/services'

export const useCreateRequestMutation = () => {
  return useMutation({
    mutationFn: createRequest,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
    },
  })
}
