import { useCallback, useState } from 'react'
import { QueryKey, useQueryClient } from '@tanstack/react-query'

const useRefresh = () => {
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(
    async (queryKeys: QueryKey[]) => {
      setRefreshing(true)
      await Promise.all(
        queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key }))
      )
      setRefreshing(false)
    },
    [queryClient]
  )

  return { onRefresh, refreshing }
}

export default useRefresh
