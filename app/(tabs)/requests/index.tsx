import { useLayoutEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FAB } from 'react-native-paper'

import { ThemedView } from '@/components/themed-view'
import HeaderTabs from '@/modules/request/components/header-tabs'
import { REQUESTS_TABS } from '@/modules/request/requests.data'
import {
  useGetRequestsQuery,
  useGetAllRequestsQuery,
} from '@/hooks/queries/use-requests'
import RequestList from '@/modules/request/components/request-list'
import BrowseRequestList from '@/modules/request/components/browse-request-list'
import useRefresh from '@/hooks/use-pull-refresh'
import useGetLocation from '@/hooks/use-get-location'
import { COLORS } from '@/constants/theme'
import OngoingRequestList from '@/modules/request/components/outgoing-request-list'

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 0,
  },
  floatingButton: {
    position: 'absolute',
    width: 55,
    height: 55,
    borderRadius: 9999,
    backgroundColor: COLORS.primary[500],
    alignSelf: 'flex-end',
    bottom: 50,
    right: 16,
  },
})

const BROWSE_TAB = REQUESTS_TABS[0].value.toString()
const MY_REQUESTS_TAB = REQUESTS_TABS[2].value.toString()
const ONGOING_TAB = REQUESTS_TABS[1].value

export default function Requests() {
  const [selectedTab, setSelectedTab] = useState(BROWSE_TAB)
  const router = useRouter()
  const { currentLocation } = useGetLocation()
  const { onRefresh, refreshing } = useRefresh()

  const { tab } = useLocalSearchParams<{ tab: string }>()

  const { data: allRequestsData, isLoading: browseLoading } =
    useGetAllRequestsQuery(selectedTab)

  const handleViewResponders = (id: string) => {
    router.push({ pathname: '/(requests)/request-details', params: { id } })
  }

  useLayoutEffect(() => {
    if (tab) {
      setSelectedTab(tab)
    }
  }, [tab])

  const isMyRequestsTab = selectedTab === MY_REQUESTS_TAB
  const isBrowseTab = selectedTab === BROWSE_TAB
  const ongoingTab = selectedTab === ONGOING_TAB

  const userLat = currentLocation?.coords.latitude
  const userLon = currentLocation?.coords.longitude

  return (
    <>
      <HeaderTabs
        list={REQUESTS_TABS}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />
      <ThemedView style={styles.content}>
        {isBrowseTab ? (
          <BrowseRequestList
            data={allRequestsData ?? []}
            isLoading={browseLoading}
            refreshing={refreshing}
            onRefresh={onRefresh}
            userLat={userLat}
            userLon={userLon}
          />
        ) : isMyRequestsTab ? (
          <>
            <RequestList
              list={allRequestsData ?? []}
              isLoading={browseLoading}
              onRefresh={onRefresh}
              refreshing={refreshing}
              onViewResponders={handleViewResponders}
            />
            {(allRequestsData?.length ?? 0) > 0 ? (
              <FAB
                icon="plus"
                color="white"
                onPress={() => router.push('/(requests)/create-request')}
                style={styles.floatingButton}
              />
            ) : null}
          </>
        ) : ongoingTab ? (
          <OngoingRequestList
            data={allRequestsData ?? []}
            isLoading={browseLoading}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        ) : null}
      </ThemedView>
    </>
  )
}
