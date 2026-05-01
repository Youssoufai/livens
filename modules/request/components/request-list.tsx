import { FlatList, StyleSheet, View } from 'react-native'

import { RequestData } from '@/services/requests/request.types'

import EmptyState from './empty-state'
import RequestCard from './request-card'

const RequestList = ({ list = [] }: { list?: RequestData[] }) => {
  return (
    <FlatList
      data={list}
      keyExtractor={(item, index) => item.id ?? `${item.location}_${index}`}
      ListEmptyComponent={<EmptyState />}
      renderItem={({ item }) => (
        <RequestCard
          title={item.location}
          description={item.description}
          // status={item.status}
        />
      )}
      contentContainerStyle={styles.contentContainer}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    rowGap: 16,
    flexGrow: 1,
  },
})

export default RequestList
