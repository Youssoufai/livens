import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { useMemo, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'

import { ThemedView } from '@/components/themed-view'
import SearchResultCard from '@/modules/search/components/search-result-card'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import SearchIcon from '@/components/icons/search'

import { SearchFilters, SearchResultItem } from '@/modules/search/search.types'
import LocationInput from '@/components/location-input'
import { useSearchQuery } from '@/hooks/queries/use-search'
import SearchFilter from '@/modules/search/components/search-filter'
import useRefresh from '@/hooks/use-pull-refresh'

const now = new Date()

const startOfLastMonth = new Date(
  now.getFullYear(),
  now.getMonth() - 1,
  1
).getTime()

const endOfLastMonth = new Date(
  now.getFullYear(),
  now.getMonth(),
  0,
  23,
  59,
  59,
  999
).getTime()

const SearchResult = () => {
  const [searchedLocation, setSearchedLocation] = useState<LocationType | null>(
    null
  )
  const [period, setPeriod] = useState('1hr')
  const [filters, setFilters] = useState<SearchFilters>({})

  const { location } = useLocalSearchParams<{ location: string }>()

  const { refreshing, onRefresh } = useRefresh()

  const parsedLocation = useMemo(
    () => (location ? (JSON.parse(location) as LocationType) : undefined),
    [location]
  )

  const { data: rawResults, isLoading } = useSearchQuery({
    location: searchedLocation ?? parsedLocation,
    period,
  })

  const variables = useMemo(
    () => ({
      location: searchedLocation || parsedLocation,
      period,
    }),
    [period, searchedLocation, parsedLocation]
  )

  const hasSearched = !!variables
  const showEmpty = hasSearched && !isLoading && rawResults?.length === 0
  const locationTitle =
    rawResults?.[0]?.location ?? variables?.location?.formattedAddress ?? ''

  const filteredResults = useMemo<SearchResultItem[]>(() => {
    if (!rawResults?.length) return []

    let results = [...rawResults]

    if (filters.datePosted && filters.datePosted !== 'anytime') {
      const now = Date.now()
      const cutoffMap: Record<string, number> = {
        'last-24h': 24 * 60 * 60 * 1000,
        'last-week': 7 * 24 * 60 * 60 * 1000,
        'last-month': endOfLastMonth,
      }
      const cutoff = cutoffMap[filters.datePosted]

      if (cutoff) {
        results = results.filter((r) => {
          const createdAt = new Date(r.created_at).getTime()
          return filters.datePosted !== 'last-month'
            ? now - createdAt <= cutoff
            : createdAt >= startOfLastMonth && createdAt <= endOfLastMonth
        })
      }
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

  const handleLocation = async (values: LocationType) => {
    setSearchedLocation(values)
  }

  return (
    <>
      <ThemedView hasBottomPadding hasTopPadding style={styles.container}>
        <View style={styles.searchWrapper}>
          <LocationInput
            placeholder="Search places and areas around you"
            onLocation={handleLocation}
            inputContainerStyle={styles.searchInput}
          />
        </View>

        <SearchFilter filters={filters} onFiltersChange={setFilters} />
        <FlatList
          data={filteredResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const topResponse = item.response
            const responder = item.responder

            return (
              <SearchResultCard
                description={item.description}
                location={item.location}
                user={item.user}
                responderName={responder.name}
                responderCreatedAt={topResponse?.created_at}
                responderComment={topResponse?.comment}
                responderMediaPaths={topResponse?.media_paths}
                onPress={() => handleCardPress(item)}
              />
            )
          }}
          ListHeaderComponent={
            <View style={styles.resultsHeader}>
              <Text size={13} lineHeight={18} color="grey-500">
                {rawResults?.length} search result
                {rawResults?.length !== 1 ? 's' : ''}{' '}
                {variables?.location?.formattedAddress ? ' for ' : ''}
                <Text size={13} lineHeight={18} weight={700} color="grey-800">
                  {locationTitle}
                </Text>{' '}
                closest to you
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <SearchIcon fill={COLORS.grey[200]} width={48} height={48} />
              <Text
                size={16}
                lineHeight={22}
                weight={600}
                align="center"
                color="grey-700"
              >
                No results
                {variables?.location?.formattedAddress
                  ? ` for "${variables?.location?.formattedAddress}"`
                  : ' found'}
              </Text>
              <Text size={14} lineHeight={20} color="grey-300" align="center">
                Try using different keywords or check your spelling
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh([['search-request']])}
            />
          }
        />
      </ThemedView>
    </>
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
  searchInput: {
    borderRadius: 30,
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
