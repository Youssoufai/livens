import { StyleSheet, View } from 'react-native'
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group'
import { useLocalSearchParams } from 'expo-router'

import { ThemedView } from '@/components/themed-view'
import { getRespondersTabData } from '@/modules/request/requests.data'
import HeaderTabs from '@/modules/request/components/header-tabs'
import { COLORS } from '@/constants/theme'
import ScrollView from '@/components/scrollview'
import RequestOverview from '@/modules/request/components/request-overview'
import RequestResponsesStatus from '@/modules/request/components/request-responder-status'
import RequestResponses from '@/modules/request/components/request-responses'
import { useGetRequestResponders } from '@/hooks/queries/use-requests'

const RequestDetails = () => {
  const queryParams = useLocalSearchParams<{ id: string }>()

  const [currentTab, setCurrentTab] = useState('')
  const [numResponders, setNumRespnonders] = useState(0)

  const { data: responsesData, isLoading } = useGetRequestResponders(
    queryParams.id
  )

  const list = useMemo(
    () => getRespondersTabData(numResponders),
    [numResponders]
  )

  useEffect(() => {
    setCurrentTab(list[0].value)
  }, [list[0].value])

  useEffect(() => {
    if (responsesData?.length) {
      setNumRespnonders(responsesData.length)
    }
  }, [responsesData?.length])

  const moveToStatus = useCallback(() => {
    setCurrentTab(list[2]?.value)
  }, [list])

  const content: Record<string, ReactElement> = useMemo(
    () => ({
      overview: <RequestOverview id={queryParams.id} />,
      responders: (
        <RequestResponses
          requestId={queryParams.id}
          data={responsesData}
          isLoading={isLoading}
          onGotoStatus={moveToStatus}
        />
      ),
      status: <RequestResponsesStatus id={queryParams.id} />,
    }),
    [queryParams.id, isLoading, responsesData, moveToStatus]
  )

  return (
    <>
      <ThemedView hasBottomPadding style={styles.container}>
        <View style={styles.tabWrapper}>
          <HeaderTabs
            list={list}
            selected={currentTab}
            onSelect={setCurrentTab}
            containerStyle={styles.tabContainer}
          />
        </View>
        <ScrollView style={styles.scrollContent}>
          {content[currentTab]}
        </ScrollView>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  tabWrapper: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
    paddingHorizontal: 16,
  },
  tabContainer: {
    width: '100%',
    maxWidth: 260,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
})

export default RequestDetails
