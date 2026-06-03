import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/services'
import { addAccount } from '@/services/profile'

export const useAddAccountMutation = () =>
  useMutation({
    mutationFn: addAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    },
  })
