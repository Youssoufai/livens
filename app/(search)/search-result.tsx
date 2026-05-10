import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'

import { ThemedView } from '@/components/themed-view'
import SearchInput from '@/components/search-input'
import SearchFilter from '@/modules/search/components/search-filter'
import { COLORS } from '@/constants/theme'

const SearchResult = () => {
  const [search, setSearch] = useState('')
  const [filterOption, setFilterOption] = useState<string>()

  const clearInput = () => {
    setSearch('')
  }

  return (
    <ThemedView hasBottomPadding hasTopPadding style={styles.container}>
      <View style={styles.searchWrapper}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          onClear={clearInput}
        />
        <SearchFilter
          value={filterOption ?? ''}
          onValueChange={setFilterOption}
        />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
    rowGap: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
})

export default SearchResult
