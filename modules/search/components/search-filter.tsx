import { Pressable, StyleSheet, View } from 'react-native'
import { useState } from 'react'

import Text from '@/components/text'
import BottomSheet from '@/components/bottomsheet'
import { COLORS } from '@/constants/theme'
import ScrollView from '@/components/scrollview'

import {
  SearchDateFilter,
  SearchFilterProps,
  SearchHasResponsesFilter,
  SearchSortFilter,
} from '../search.types'
import {
  DATE_FILTER_OPTIONS,
  HAS_RESPONSES_OPTIONS,
  SORT_OPTIONS,
} from '../search.data'

type ActiveSheet = 'date-posted' | 'sort' | 'has-responses' | null

const SearchFilter = ({ filters, onFiltersChange }: SearchFilterProps) => {
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null)

  const closeSheet = () => setActiveSheet(null)

  const dateLabelObj = DATE_FILTER_OPTIONS.find(
    (o) => o.value === filters.datePosted
  )
  const dateLabel = dateLabelObj ? dateLabelObj.shortLabel : 'Date posted'
  const dateActive = !!filters.datePosted

  const sortLabelObj = SORT_OPTIONS.find((o) => o.value === filters.sort)
  const sortLabel = sortLabelObj ? sortLabelObj.label : 'Sort by'
  const sortActive = !!filters.sort

  const hasResponsesLabelObj = HAS_RESPONSES_OPTIONS.find(
    (o) => o.value === filters.hasResponses
  )
  const hasResponsesLabel = hasResponsesLabelObj
    ? `Has responses: ${hasResponsesLabelObj.label}`
    : 'Has responses?'
  const hasResponsesActive = !!filters.hasResponses

  const setDate = (value: SearchDateFilter) => {
    onFiltersChange({ ...filters, datePosted: value })
    closeSheet()
  }

  const setSort = (value: SearchSortFilter) => {
    onFiltersChange({ ...filters, sort: value })
    closeSheet()
  }

  const setHasResponses = (value: SearchHasResponsesFilter) => {
    onFiltersChange({ ...filters, hasResponses: value })
    closeSheet()
  }

  return (
    <>
      <ScrollView horizontal>
        <View style={styles.container}>
          <Pressable
            style={[styles.chip, dateActive && styles.chipActive]}
            onPress={() => setActiveSheet('date-posted')}
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

          <Pressable
            style={[styles.chip, hasResponsesActive && styles.chipActive]}
            onPress={() => setActiveSheet('has-responses')}
          >
            <Text
              size={14}
              lineHeight={18}
              weight={600}
              color={hasResponsesActive ? 'white' : 'grey-500'}
            >
              {hasResponsesLabel}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Date posted filter sheet */}
      <BottomSheet
        title="Filter date posted"
        isVisible={activeSheet === 'date-posted'}
        snapPoints={[320]}
        index={-1}
        onClose={closeSheet}
        enablePanDownToClose
        backdropPress="close"
      >
        <View style={styles.sheetContent}>
          {DATE_FILTER_OPTIONS.map((option) => {
            const isSelected = filters.datePosted === option.value
            return (
              <Pressable
                key={option.value}
                style={styles.sheetOption}
                onPress={() => setDate(option.value)}
              >
                <View
                  style={[styles.radio, isSelected && styles.radioSelected]}
                >
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text size={15} lineHeight={22} color="grey-700" weight={400}>
                  {option.label}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </BottomSheet>

      {/* Sort by filter sheet */}
      <BottomSheet
        title="Sort by"
        isVisible={activeSheet === 'sort'}
        snapPoints={[240]}
        index={-1}
        onClose={closeSheet}
        enablePanDownToClose
        backdropPress="close"
      >
        <View style={styles.sheetContent}>
          {SORT_OPTIONS.map((option) => {
            const isSelected = filters.sort === option.value
            return (
              <Pressable
                key={option.value}
                style={styles.sheetOption}
                onPress={() => setSort(option.value)}
              >
                <View
                  style={[styles.radio, isSelected && styles.radioSelected]}
                >
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text size={15} lineHeight={22} color="grey-700" weight={400}>
                  {option.label}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </BottomSheet>

      {/* Has responses filter sheet */}
      <BottomSheet
        title="Has responses"
        isVisible={activeSheet === 'has-responses'}
        snapPoints={[220]}
        index={-1}
        onClose={closeSheet}
        enablePanDownToClose
        backdropPress="close"
      >
        <View style={styles.sheetContent}>
          {HAS_RESPONSES_OPTIONS.map((option) => {
            const isSelected = filters.hasResponses === option.value
            return (
              <Pressable
                key={option.value}
                style={styles.sheetOption}
                onPress={() => setHasResponses(option.value)}
              >
                <View
                  style={[styles.radio, isSelected && styles.radioSelected]}
                >
                  {isSelected && <View style={styles.radioDot} />}
                </View>
                <Text size={15} lineHeight={22} color="grey-700" weight={400}>
                  {option.label}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
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
  sheetContent: {
    paddingTop: 8,
    rowGap: 4,
  },
  sheetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 14,
    paddingVertical: 14,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.grey[200],
    alignItems: 'center',
    justifyContent: 'center',
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
