import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import { useCallback, useState } from 'react'
import { useRouter } from 'expo-router'

import ForumIcon from '@/assets/icons/forum.svg'
import OngoingRequestCardSkeleton from '@/components/placeholder/ongoing-request-card-skeleton'
import {
  RequestData,
  RequestStatusType,
} from '@/services/requests/request.types'
import { generateArray } from '@/utils/generator'
import { startConversation } from '@/services/chat'
import { useBoundStore } from '@/state'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'

import EmptyState from './empty-state'
import { OutgoingRequestListProps } from '../requests.types'
import { REQUESTS_TABS } from '../requests.data'
import OutgoingRequestCard from './outgoing-request-card'
import { queryClient } from '@/services'

const OngoingRequestList = ({
  data,
  isLoading,
  refreshing,
  onRefresh,
}: OutgoingRequestListProps) => {
  const [chatLoading, setChatLoading] = useState(false)

  const router = useRouter()

  const handleMessaging = useCallback(
    async (requestId: string, requesterId: string, conversationId?: string) => {
      setChatLoading(true)
      try {
        let conversation_id = conversationId

        if (!conversation_id) {
          const response = await startConversation([requesterId], requestId)

          queryClient.invalidateQueries({
            queryKey: ['all-requests', REQUESTS_TABS[1].value.toString()],
          })

          conversation_id = response.id
        }

        router.push({
          pathname: '/(requests)/chat',
          params: {
            conversationId: conversation_id,
            requestId,
            receiverId: requesterId,
          },
        })
      } catch (error) {
        showToastMessage(catchErr(error).message ?? '', 'error')
      } finally {
        setChatLoading(false)
      }
    },
    []
  )

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

  const handleEditResponse = useCallback((id: string) => {
    router.push({
      pathname: '/(requests)/edit-response',
      params: { request_id: id },
    })
  }, [])

  const requestList: (RequestData | string)[] = isLoading
    ? generateArray<string>(4)
    : data

  return (
    <FlatList
      data={requestList}
      keyExtractor={(item, index) => {
        if (typeof item === 'string') return `ongoing-placeholder_${index}`

        return item.id
      }}
      ListEmptyComponent={
        !isLoading ? (
          <EmptyState
            icon={<ForumIcon />}
            title="No ongoing requests yet"
            description="When you respond to a request, they will appear here."
          />
        ) : null
      }
      renderItem={({ item }) => {
        if (typeof item !== 'object') return <OngoingRequestCardSkeleton />

        return (
          <OutgoingRequestCard
            id={item.id}
            requesterId={item.user_id ?? ''}
            conversationId={item.conversation_id ?? ''}
            title={{ latitude: +item.latitude, longitude: +item.longitude }}
            description={item.description}
            status={item.status.toLowerCase() as RequestStatusType}
            isChatLoading={chatLoading}
            onMessage={handleMessaging}
            onWithdrawResponse={handleResponseWithdrawal}
            onAddResponse={handleAddResponse}
            onEditResponse={handleEditResponse}
          />
        )
      }}
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
