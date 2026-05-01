import { useMutation } from '@tanstack/react-query'

import { getSearchResults } from '@/services/search'
import { queryClient } from '@/services'

export const useSearchMutation = () => {
  return useMutation({
    mutationFn: getSearchResults,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['requests'] })
    },
  })
}
