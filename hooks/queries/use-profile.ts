import { useQuery } from '@tanstack/react-query'

import { getAccountList, getTransactions } from '@/services/profile'

export const useGetAccountsQuery = () =>
  useQuery({
    queryKey: ['accounts'],
    queryFn: getAccountList,
  })

export const useGetTransactionsQuery = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })
}
