import { RefreshControl, StyleSheet, View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useEffect, useState } from 'react'

import ScrollView from '@/components/scrollview'
import { useGetRequestByIdQuery } from '@/hooks/queries/use-requests'
import { generateArray } from '@/utils/generator'
import ResponseCardSkeleton from '@/components/placeholder/responder-card-placeholder'
import { useApproveRequestResponder } from '@/hooks/mutations/use-request'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import ScreenLoader from '@/components/screen-loader'
import Text from '@/components/text'
import useRefresh from '@/hooks/use-pull-refresh'

import ResponseCard from './response-card'
import { ResponderListProps } from '../requests.types'

const RequestResponses = ({
  requestId,
  data,
  isLoading,
  onGotoStatus,
}: ResponderListProps) => {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [selectedResponder, setSelectedResponder] = useState('')

  const { refreshing, onRefresh } = useRefresh()

  const { data: requestData } = useGetRequestByIdQuery(requestId)
  const { mutateAsync: approveResponder, isPending: isApprovalLoading } =
    useApproveRequestResponder(requestId)

  const responsesData = isLoading ? generateArray<string>(4) : data

  useEffect(() => {
    if (isRedirecting) {
      let timeoutId = setTimeout(() => {
        setIsRedirecting(false)
        onGotoStatus()
      }, 3000)

      return () => clearTimeout(timeoutId)
    }
  }, [isRedirecting])

  const handleApproval = async (id: string, name: string) => {
    setSelectedResponder(id)
    let errMsg = ''
    try {
      await approveResponder({ request_id: requestId, user_id: id })
      setIsRedirecting(true)
    } catch (error) {
      errMsg = catchErr(error).message ?? 'Something went wrong'
    } finally {
      showToastMessage(
        errMsg || `You’ve approved ${name} to complete your request.`,
        errMsg ? 'error' : 'success'
      )
    }
  }

  return (
    <>
      <Animated.View
        style={styles.container}
        entering={FadeIn}
        exiting={FadeOut}
      >
        {!isLoading && !data?.length ? (
          <View style={styles.emptyContainer}>
            <Text size={16} lineHeight={24} color="grey-500">
              You do not have responses yet.
            </Text>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh([['request', requestId]])}
              />
            }
          >
            {responsesData?.map((response, index) => {
              if (typeof response === 'string') {
                return (
                  <ResponseCardSkeleton key={`placeholder_response_${index}`} />
                )
              }

              if (!response) return

              const rating = +(response.user?.rating ?? 0)
              const requestCompleted = +(response.user.completed_requests ?? 0)

              return (
                <ResponseCard
                  key={response.id}
                  id={response.user_id}
                  responder={response.user.name}
                  location={response.user?.location ?? ''}
                  starRating={rating}
                  requestCompleted={requestCompleted}
                  isLoading={isApprovalLoading}
                  selected={selectedResponder}
                  isApproved={requestData?.status !== 'pending'}
                  onApprove={handleApproval}
                />
              )
            })}
          </ScrollView>
        )}
      </Animated.View>
      <ScreenLoader isLoading={isRedirecting} content="Redirecting..." />
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    rowGap: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  emptyContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
})

export default RequestResponses
