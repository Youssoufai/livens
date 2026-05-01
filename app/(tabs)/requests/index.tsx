import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { FAB } from 'react-native-paper'

import { ThemedView } from '@/components/themed-view'
import HeaderTabs from '@/modules/request/components/header-tabs'
import { REQUESTS_TABS } from '@/modules/request/requests.data'
import { useGetRequestsQuery } from '@/hooks/queries/use-requests'
import { RequestData } from '@/services/requests/request.types'
import RequestList from '@/modules/request/components/request-list'
import { COLORS } from '@/constants/theme'

const styles = StyleSheet.create({
  content: {
    paddingTop: 24,
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

export default function Requests() {
  const [selectedTab, setSelectedTab] = useState(
    REQUESTS_TABS[0].value.toString()
  )

  const router = useRouter()

  const { data: userRequestData } = useGetRequestsQuery()

  const data = selectedTab === REQUESTS_TABS[2].value ? userRequestData : []

  return (
    <>
      <HeaderTabs
        list={REQUESTS_TABS}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />
      <ThemedView style={styles.content}>
        <RequestList list={data} />
        {data?.length ? (
          <FAB
            icon="plus"
            color="white"
            onPress={() => router.push('/(requests)/create-request')}
            style={styles.floatingButton}
          />
        ) : null}
      </ThemedView>
    </>
  )
}
