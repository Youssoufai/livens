import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { useCallback } from 'react'
import { useRouter } from 'expo-router'

import ForumIcon from '@/assets/icons/forum.svg'

import EmptyState from './empty-state'
import { OutgoingRequestListProps } from '../requests.types'
import { REQUESTS_TABS } from '../requests.data'
import OutgoingRequestCard from './outgoing-request-card'

const OngoingRequestList = ({
  data,
  isLoading,
  refreshing,
  onRefresh,
}: OutgoingRequestListProps) => {
  const router = useRouter()

  const handleMessaging = useCallback((id: string) => {
    router.push({
      pathname: '/(requests)/chat',
      params: { id },
    })
  }, [])

  const handleResponseWithdrawal = useCallback(async () => {
    try {
    } catch (error) {}
  }, [])

  const handleAddResponse = useCallback(async (id: string) => {
    router.push({
      pathname: '/(requests)/outgoing-details',
      params: { id },
    })
  }, [])

  const handleEditResponse = useCallback(async () => {
    try {
    } catch (error) {}
  }, [])

  return (
    <FlatList
      data={data ?? []}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        !isLoading ? (
          <EmptyState
            icon={<ForumIcon />}
            title="No ongoing requests yet"
            description="When you respond to a request, they will appear here."
          />
        ) : null
      }
      renderItem={({ item }) => (
        <OutgoingRequestCard
          id={item.id}
          title={{ latitude: +item.latitude, longitude: +item.longitude }}
          description={item.description}
          onMessage={handleMessaging}
          onWithdrawResponse={handleResponseWithdrawal}
          onAddResponse={handleAddResponse}
          onEditResponse={handleEditResponse}
        />
      )}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() =>
            onRefresh([['all-requests', REQUESTS_TABS[1].value.toString()]])
          }
        />
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
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
})

export default OngoingRequestList
