import { useQuery } from '@tanstack/react-query'

import { getAccountList } from '@/services/profile'

export const useGetAccountsQuery = () =>
  useQuery({
    queryKey: ['accounts'],
    queryFn: getAccountList,
  })
