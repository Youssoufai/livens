import { Pressable, StyleSheet, View } from 'react-native'
import { useCallback, useState } from 'react'

import Text from '@/components/text'
import BottomSheet from '@/components/bottomsheet'
import { COLORS } from '@/constants/theme'
import ScrollView from '@/components/scrollview'

import {
  SearchDateFilter,
  SearchFilterProps,
  SearchFilters,
  SearchHasResponsesFilter,
  SearchSortFilter,
} from '../search.types'
import {
  DATE_FILTER_OPTIONS,
  HAS_RESPONSES_OPTIONS,
  SORT_OPTIONS,
} from '../search.data'
import FilterSheet from './filter-sheet'

type ActiveSheet = 'date-posted' | 'sort' | 'has-responses' | null

const SearchFilter = ({ filters, onFiltersChange }: SearchFilterProps) => {
  const [activeSheet, setActiveSheet] = useState<keyof SearchFilters | null>(
    null
  )

  const dateLabelObj = DATE_FILTER_OPTIONS.find(
    (o) => o.value === filters.datePosted
  )
  const dateLabel = dateLabelObj ? dateLabelObj.shortLabel : 'Date posted'
  const dateActive = !!filters.datePosted

  const sortLabelObj = SORT_OPTIONS.find((o) => o.value === filters.sort)
  const sortLabel = sortLabelObj ? sortLabelObj.label : 'Sort by'
  const sortActive = !!filters.sort

  const setDate = (value: SearchDateFilter) => {
    onFiltersChange({ ...filters, datePosted: value })
    closeSheet()
  }

  const updateFilterOptions = (type: keyof SearchFilters, value: string) => {
    onFiltersChange((prevOptions) => ({ ...prevOptions, [type]: value }))
    closeSheet()
  }

  const closeSheet = useCallback(() => {
    setActiveSheet(null)
  }, [])

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={[styles.chip, dateActive && styles.chipActive]}
          onPress={() => setActiveSheet('datePosted')}
        >
          <Text
            size={14}
            lineHeight={18}
            weight={600}
            color={dateActive ? 'white' : 'grey-500'}
          >
            {dateLabel}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.chip, sortActive && styles.chipActive]}
          onPress={() => setActiveSheet('sort')}
        >
          <Text
            size={14}
            lineHeight={18}
            weight={600}
            color={sortActive ? 'white' : 'grey-500'}
          >
            {sortLabel}
          </Text>
        </Pressable>
      </View>

      <FilterSheet
        isVisible={!!activeSheet}
        activeSheet={activeSheet ?? 'datePosted'}
        sortValue={filters?.sort ?? ''}
        datePostedValue={filters?.datePosted ?? ''}
        onDatePostedChange={(value) => updateFilterOptions('datePosted', value)}
        onSortChange={(value) => updateFilterOptions('sort', value)}
        onCloseSheet={closeSheet}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
  chip: {
    borderWidth: 1,
    borderColor: COLORS.grey[200],
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  chipActive: {
    backgroundColor: COLORS.grey[700],
    borderColor: COLORS.grey[700],
  },

  radioSelected: {
    borderColor: COLORS.primary[500],
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary[500],
  },
})

export default SearchFilter
