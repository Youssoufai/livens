import { FlatList, StyleSheet, View } from 'react-native'

import { RequestData } from '@/services/requests/request.types'

import EmptyState from './empty-state'
import RequestCard from './request-card'
import { RequestListProps } from '../requests.types'

const RequestList = ({ list = [], onViewResponders }: RequestListProps) => {
  return (
    <FlatList
      data={list}
      keyExtractor={(item, index) => item.id ?? `${item.location}_${index}`}
      ListEmptyComponent={<EmptyState />}
      renderItem={({ item }) => (
        <RequestCard
          id={item.id}
          title={item.location}
          description={item.description}
          // status={item.status}
          onPress={onViewResponders}
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
