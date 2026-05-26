import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { useCallback } from 'react'
import { useRouter } from 'expo-router'

import { RequestData } from '@/services/requests/request.types'
import ForumIcon from '@/assets/icons/forum.svg'
import { generateArray } from '@/utils/generator'
import BrowseRequestCardSkeleton from '@/components/placeholder/browse-request-card-skeleton'

import BrowseRequestCard from './browse-request-card'
import EmptyState from './empty-state'
import { BrowseRequestListProps } from '../requests.types'
import { REQUESTS_TABS } from '../requests.data'

const BrowseRequestList = ({
  data,
  isLoading,
  refreshing,
  onRefresh,
  userLat,
  userLon,
}: BrowseRequestListProps) => {
  const router = useRouter()

  const handleBrowsePress = useCallback((id: string) => {
    router.push({
      pathname: '/(requests)/browse-request-details',
      params: { id },
    })
  }, [])

  const requestList: (RequestData | string)[] = isLoading
    ? generateArray<string>(4)
    : data

  return (
    <FlatList
      data={requestList}
      keyExtractor={(item, index) => {
        if (typeof item === 'string') {
          return `browse-request-placeholder_$${index}`
        }

        return item.id
      }}
      ListEmptyComponent={
        !isLoading ? (
          <EmptyState
            icon={<ForumIcon />}
            title="No requests to browse through yet"
            description="Any request close to you will appear here."
          />
        ) : null
      }
      renderItem={({ item }) => {
        if (typeof item !== 'object') return <BrowseRequestCardSkeleton />

        return (
          <BrowseRequestCard
            id={item.id}
            name={item.user.name ?? ''}
            description={item.description}
            reward={item.reward}
            createdAt={item.created_at}
            duration={item.duration}
            longitude={+item.longitude}
            latitude={+item.latitude}
            location={item.location ?? ''}
            userLat={userLat}
            userLon={userLon}
            requesterLocation={item.user.location ?? ''}
            onPress={handleBrowsePress}
          />
        )
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() =>
            onRefresh([['all-requests', REQUESTS_TABS[0].value.toString()]])
          }
        />
      }
      contentContainerStyle={styles.browseList}
    />
  )
}

export default BrowseRequestList

const styles = StyleSheet.create({
  browseList: {
    rowGap: 12,
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
})
