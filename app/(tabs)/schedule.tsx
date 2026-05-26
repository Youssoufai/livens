import { useState } from 'react'
import { StyleSheet } from 'react-native'

import { ThemedView } from '@/components/themed-view'
import HeaderTabs from '@/modules/request/components/header-tabs'
import { useGetSentOfferListQuery } from '@/hooks/queries/use-response'
import SentOfferList from '@/modules/offers/components/sent-offer-list'
import { SentOfferResponseType } from '@/services/response/response.types'
import useRefresh from '@/hooks/use-pull-refresh'
import { QueryObserverResult } from '@tanstack/react-query'

const OFFERS_TABS: ListItem[] = [
  { label: 'Sent offers', value: 'sent' },
  { label: 'Archived offers', value: 'archived' },
]

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('sent')
  const { data, isLoading, refetch } = useGetSentOfferListQuery()

  const { refreshing, onRefreshQuery } = useRefresh()

  const responseData = data as unknown as SentOfferResponseType
  const allOffers = responseData?.approved ?? []

  const sentOffers = allOffers.filter(
    (o) =>
      o.status === 'pending' ||
      o.status === 'active' ||
      o.status === 'waiting for approval'
  )
  const archivedOffers = allOffers.filter((o) => o.status === 'completed')

  const isSentTab = activeTab === 'sent'

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
          data={isSentTab ? sentOffers : archivedOffers}
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
