import { useState } from 'react'
import { StyleSheet } from 'react-native'

import { ThemedView } from '@/components/themed-view'
import HeaderTabs from '@/modules/request/components/header-tabs'
import { useGetSentOfferListQuery } from '@/hooks/queries/use-response'
import SentOfferList from '@/modules/offers/components/sent-offer-list'
import { SentOfferResponseType } from '@/services/response/response.types'

const OFFERS_TABS: ListItem[] = [
  { label: 'Sent offers', value: 'sent' },
  { label: 'Archived offers', value: 'archived' },
]

const Schedule = () => {
  const [activeTab, setActiveTab] = useState('sent')
  const { data, isLoading, isRefetching, refetch } = useGetSentOfferListQuery()

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

  return (
    <>
      <HeaderTabs
        list={OFFERS_TABS}
        selected={activeTab}
        onSelect={setActiveTab}
      />
      <ThemedView style={styles.content}>
        <SentOfferList
          data={isSentTab ? sentOffers : archivedOffers}
          isLoading={isLoading}
          refreshing={isRefetching}
          onRefresh={refetch}
          cardStatus={isSentTab ? 'pending_approval' : 'not_selected'}
          emptyTitle={
            isSentTab ? 'No sent offers yet' : 'No archived offers'
          }
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
  },
})

export default Schedule
