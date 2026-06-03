import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { History } from 'lucide-react-native'

import { TransactionStatus } from '@/modules/profile/profile.types'
import { ThemedView } from '@/components/themed-view'
import TransactionCard from '@/modules/profile/components/transaction-card'
import TransactionCardSkeleton from '@/components/placeholder/transaction-card-skeleton'
import { useGetTransactionsQuery } from '@/hooks/queries/use-profile'
import EmptyState from '@/modules/request/components/empty-state'
import { generateArray } from '@/utils/generator'
import { COLORS } from '@/constants/theme'
import useRefresh from '@/hooks/use-pull-refresh'

export default function TransactionHistory() {
  const { data: transactions = [], isLoading } = useGetTransactionsQuery()

  const { refreshing, onRefresh } = useRefresh()

  const list: (Transaction | string)[] = isLoading
    ? generateArray<string>(6)
    : transactions

  return (
    <ThemedView style={styles.container} hasBottomPadding>
      <FlatList
        data={list}
        keyExtractor={(item, index) => {
          if (typeof item === 'string')
            return `transaction-placeholder_${index}`
          return item.id.toString()
        }}
        renderItem={({ item, index }) => {
          if (typeof item === 'string') return <TransactionCardSkeleton />
          return (
            <TransactionCard
              id={item.id.toString()}
              type={item.type}
              amount={item.amount}
              status={item.status.toLowerCase() as TransactionStatus}
              date={item.created_at}
              hasBorder={index < list.length - 1}
            />
          )
        }}
        ListEmptyComponent={
          <EmptyState
            icon={<History size={32} color={COLORS.grey[300]} />}
            description="Once you start making transactions, your history will show up here."
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh([['transactions']])}
          />
        }
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  list: {
    paddingTop: 24,
    flexGrow: 1,
  },
})
