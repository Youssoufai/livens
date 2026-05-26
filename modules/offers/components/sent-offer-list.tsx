import { useCallback } from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

import SentOfferCardSkeleton from '@/components/placeholder/sent-offer-card-skeleton'
import EmptyState from '@/modules/request/components/empty-state'
import { Approved } from '@/services/response/response.types'

import ScheduleSendIcon from '@/assets/icons/schedule_send_lg.svg'

import SentOfferCard from './sent-offer-card'
import { SentOfferListProps } from '../offers.types'
import { GLOBAL_HORIZONTAL_PADDING } from '@/constants'

const SKELETON_COUNT = 3

const SentOfferList = ({
  type,
  data,
  isLoading,
  refreshing = false,
  onRefresh,
  emptyTitle = 'No sent offers yet',
  emptyDescription = 'When you respond to requests, your offers will appear here.',
}: SentOfferListProps) => {
  const router = useRouter()

  const handlePress = useCallback(
    (id: string) => {
      router.push({ pathname: '/(offers)/sent', params: { id } })
    },
    [router]
  )

  if (isLoading) {
    return (
      <FlatList
        data={Array.from({ length: SKELETON_COUNT })}
        keyExtractor={(_, i) => `skeleton-${i}`}
        renderItem={() => <SentOfferCardSkeleton />}
        scrollEnabled={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.list}
      />
    )
  }

  return (
    <FlatList
      data={data ?? []}
      keyExtractor={(item, index) => item.id}
      ListEmptyComponent={
        <EmptyState
          icon={<ScheduleSendIcon />}
          title={emptyTitle}
          description={emptyDescription}
        />
      }
      renderItem={({ item }) => (
        <SentOfferCard
          id={item.id}
          description={item.description}
          status={item.status}
          timestamp={item.created_at}
          onPress={handlePress}
        />
      )}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      contentContainerStyle={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    rowGap: 12,
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 30,
    paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
  },
})

export default SentOfferList
