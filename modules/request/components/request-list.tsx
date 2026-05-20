import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { useCallback } from 'react'
import { router, useRouter } from 'expo-router'

import { useCancelRequestMutation } from '@/hooks/mutations/use-request'
import ScreenLoader from '@/components/screen-loader'
import { catchErr } from '@/utils/error-handlers'
import { showToastMessage } from '@/components/notification'
import useRefresh from '@/hooks/use-pull-refresh'
import { RequestStatusType } from '@/services/requests/request.types'

import EmptyState from './empty-state'
import RequestCard from './request-card'
import { RequestListProps } from '../requests.types'
import { REQUESTS_TABS } from '../requests.data'

const RequestList = ({ list = [], onViewResponders }: RequestListProps) => {
  const { mutateAsync: cancelRequest, isPending } = useCancelRequestMutation()

  const { onRefresh, refreshing } = useRefresh()

  const handleCancelRequest = useCallback(
    async (id: string) => {
      let errorMsg = ''

      try {
        await cancelRequest(id)
      } catch (error) {
        errorMsg =
          catchErr(error).message ??
          'Something went wrong. Please, try again later.'
      } finally {
        showToastMessage(
          errorMsg || 'Your request was successfully cancelled',
          errorMsg ? 'error' : 'success'
        )
      }
    },
    [cancelRequest]
  )

  const startNewRequest = () => {
    router.push('/(requests)/create-request')
  }

  return (
    <>
      <FlatList
        data={list}
        keyExtractor={(item, index) => item.id ?? `${item.longitude}_${index}`}
        ListEmptyComponent={
          <EmptyState
            title="You don’t have any requests"
            description="Your posted requests will be visible to respondents. Create a request now."
            buttonLabel="Create a request"
            onPress={startNewRequest}
          />
        }
        renderItem={({ item }) => {
          const location = item.location
            ? item.location
            : {
                latitude: +item.latitude,
                longitude: +item.longitude,
              }

          return (
            <RequestCard
              id={item.id}
              title={location}
              description={item.description}
              status={item.status.toLowerCase() as RequestStatusType}
              onPress={onViewResponders}
              onCancelRequest={handleCancelRequest}
            />
          )
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() =>
              onRefresh([['all-requests', REQUESTS_TABS[2].value]])
            }
          />
        }
        contentContainerStyle={styles.contentContainer}
      />
      <ScreenLoader isLoading={isPending} content="Cancelling request" />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  contentContainer: {
    rowGap: 16,
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
})

export default RequestList
