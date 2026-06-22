import { useState } from 'react'
import { StyleSheet } from 'react-native'

import { ThemedView } from '@/components/themed-view'
import HeaderTabs from '@/modules/request/components/header-tabs'
import { useGetSentOfferListQuery } from '@/hooks/queries/use-response'
import SentOfferList from '@/modules/offers/components/sent-offer-list'
import { SentOfferResponseType } from '@/services/response/response.types'
import useRefresh from '@/hooks/use-pull-refresh'

const OFFERS_TABS: ListItem[] = [
  { label: 'Sent offers', value: 'sent_offers' },
  { label: 'Archived offers', value: 'archived' },
]

const Schedule = () => {
  const [activeTab, setActiveTab] = useState(OFFERS_TABS[0].value.toString())
  const { data, isLoading, refetch, error } =
    useGetSentOfferListQuery(activeTab)

  const { refreshing, onRefreshQuery } = useRefresh()

  const responseData = data as unknown as SentOfferResponseType

  const isSentTab = activeTab === OFFERS_TABS[0].value

  const handleRefresh = () => {
    onRefreshQuery(refetch)
  }

  return (
    <>
      <HeaderTabs
        list={OFFERS_TABS}
        selected={activeTab}
        onSelect={setActiveTab}
        contentStyle={styles.tabsContainer}
      />
      <ThemedView style={styles.content}>
        <SentOfferList
          type={activeTab}
          data={data?.data}
          isLoading={isLoading}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          emptyTitle={isSentTab ? 'No sent offers yet' : 'No archived offers'}
          emptyDescription={
            isSentTab
              ? 'When you respond to requests, your offers will appear here.'
              : 'Offers that were not selected will appear here.'
          }
        />
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 0,
  },
  tabsContainer: {
    justifyContent: 'flex-start',
    columnGap: 12,
  },
})

export default Schedule
