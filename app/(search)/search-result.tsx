import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
} from 'react-native'
import { useEffect, useMemo, useRef, useState } from 'react'
import { router } from 'expo-router'

import { ThemedView } from '@/components/themed-view'
import SearchInput from '@/components/search-input'
import SearchFilter from '@/modules/search/components/search-filter'
import SearchResultCard from '@/modules/search/components/search-result-card'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import { useSearchMutation } from '@/hooks/mutations/use-search'
import SearchIcon from '@/components/icons/search'

import { SearchFilters, SearchResultItem } from '@/modules/search/search.types'

const SearchResult = () => {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({})
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { mutate, data: rawResults, isPending, variables } = useSearchMutation()

  const clearInput = () => {
    setSearch('')
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!search.trim()) return

    debounceRef.current = setTimeout(() => {
      mutate(search.trim())
    }, 500)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [search])

  const filteredResults = useMemo<SearchResultItem[]>(() => {
    if (!rawResults?.length) return []

    let results = [...rawResults]

    if (filters.datePosted && filters.datePosted !== 'anytime') {
      const now = Date.now()
      const cutoffMap: Record<string, number> = {
        'last-24h': 24 * 60 * 60 * 1000,
        'last-week': 7 * 24 * 60 * 60 * 1000,
        'last-month': 30 * 24 * 60 * 60 * 1000,
      }
      const cutoff = cutoffMap[filters.datePosted]
      if (cutoff) {
        results = results.filter(
          (r) => now - new Date(r.created_at).getTime() <= cutoff
        )
      }
    }

    if (filters.hasResponses === 'yes') {
      results = results.filter((r) => (r.responses?.length ?? 0) > 0)
    } else if (filters.hasResponses === 'no') {
      results = results.filter((r) => !r.responses?.length)
    }

    if (filters.sort === 'oldest') {
      results = results.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
    } else {
      results = results.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    }

    return results
  }, [rawResults, filters])

  const hasSearched = !!variables
  const showEmpty = hasSearched && !isPending && filteredResults.length === 0
  const locationTitle = filteredResults[0]?.location ?? variables ?? ''

  const handleCardPress = (item: SearchResultItem) => {
    router.push({
      pathname: '/(search)/post-detail',
      params: {
        id: item.id,
        views: String(item.views ?? 0),
        saves: String(item.saves ?? 0),
      },
    })
  }

  return (
    <ThemedView hasBottomPadding hasTopPadding style={styles.container}>
      {/* Fixed header */}
      <View style={styles.searchWrapper}>
        <SearchInput
          value={search}
          onChangeText={setSearch}
          onClear={clearInput}
        />
        <SearchFilter filters={filters} onFiltersChange={setFilters} />
      </View>

      {/* Loading indicator */}
      {isPending && (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="small" color={COLORS.primary[500]} />
        </View>
      )}

      {/* Empty state */}
      {showEmpty && (
        <View style={styles.emptyState}>
          <SearchIcon fill={COLORS.grey[200]} width={48} height={48} />
          <Text size={16} lineHeight={22} weight={600} color="grey-700">
            No results for "{variables}"
          </Text>
          <Text size={14} lineHeight={20} color="grey-300" align="center">
            Try using different keywords or check your spelling
          </Text>
        </View>
      )}

      {/* Results */}
      {filteredResults.length > 0 && (
        <FlatList
          data={filteredResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SearchResultCard item={item} onPress={() => handleCardPress(item)} />
          )}
          ListHeaderComponent={
            <View style={styles.resultsHeader}>
              <Text size={13} lineHeight={18} color="grey-500">
                {filteredResults.length} search result
                {filteredResults.length !== 1 ? 's' : ''} for{' '}
                <Text size={13} lineHeight={18} weight={700} color="grey-800">
                  {locationTitle}
                </Text>{' '}
                closest to you
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Initial idle state */}
      {!hasSearched && !isPending && (
        <View style={styles.idleState}>
          <SearchIcon fill={COLORS.grey[100]} width={56} height={56} />
          <Text size={15} lineHeight={22} color="grey-300" align="center">
            Search by location to find recent updates and events nearby
          </Text>
        </View>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 0,
    rowGap: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
  loadingWrapper: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    rowGap: 12,
  },
  idleState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    rowGap: 16,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
  },
  listContent: {
    flexGrow: 1,
  },
})

export default SearchResult
