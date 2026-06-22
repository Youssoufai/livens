import { useCallback } from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

import SentOfferCardSkeleton from '@/components/placeholder/sent-offer-card-skeleton'
import EmptyState from '@/modules/request/components/empty-state'
import { GLOBAL_HORIZONTAL_PADDING } from '@/constants'
import ScheduleSendIcon from '@/assets/icons/schedule_send_lg.svg'
import { generateArray } from '@/utils/generator'
import { Approved } from '@/services/response/response.types'

import SentOfferCard from './sent-offer-card'
import { OfferStatusType, SentOfferListProps } from '../offers.types'

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

  console.log({ data })

  const handlePress = useCallback(
    (id: string) => {
      router.push({ pathname: '/(offers)/sent', params: { id } })
    },
    [router]
  )

  const offersData: (Approved | string)[] | undefined = isLoading
    ? generateArray<string>(3)
    : data

  return (
    <FlatList
      data={offersData}
      keyExtractor={(item, index) => {
        if (typeof item === 'string') {
          return `offers_placeholder_${index}`
        }

        return item.id
      }}
      ListEmptyComponent={
        <EmptyState
          icon={<ScheduleSendIcon />}
          title={emptyTitle}
          description={emptyDescription}
        />
      }
      renderItem={({ item }) => {
        if (typeof item === 'string') {
          return <SentOfferCardSkeleton />
        }

        const description =
          type === 'archived' ? item.request?.description : item.description
        const createdAt =
          type === 'archived' ? item.request?.created_at : item.created_at

        return (
          <SentOfferCard
            id={item.id}
            description={description ?? ''}
            status={
              type === 'archived'
                ? 'rejected'
                : (item.status.toLowerCase() as OfferStatusType)
            }
            timestamp={createdAt ?? ''}
            onPress={handlePress}
          />
        )
      }}
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
