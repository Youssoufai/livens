import { StyleSheet } from 'react-native'
import { useRef } from 'react'

import BottomSheet from '@/components/bottomsheet'

import DatePostedFilter from './date-posted-filter'
import SortFilter from './sort-filter'
import { FilterSheetProps } from '../search.types'

const FilterSheet = ({
  isVisible,
  activeSheet,
  sortValue,
  datePostedValue,
  onDatePostedChange,
  onSortChange,
  onCloseSheet,
}: FilterSheetProps) => {
  const snapPoints = useRef([302, 200])

  const sheetContent: Record<string, SheetContentType> = {
    datePosted: {
      title: 'Filter by date posted',

      index: 0,
      content: (
        <DatePostedFilter
          value={datePostedValue}
          onChange={onDatePostedChange}
        />
      ),
    },
    sort: {
      title: 'Filter by sort',
      index: 1,
      content: <SortFilter value={sortValue} onChange={onSortChange} />,
    },
  }

  return (
    <BottomSheet
      title={sheetContent[activeSheet]?.title}
      isVisible={isVisible}
      snapPoints={snapPoints.current}
      index={isVisible ? sheetContent[activeSheet].index : -1}
      onClose={onCloseSheet}
    >
      {sheetContent[activeSheet]?.content}
    </BottomSheet>
  )
}

export default FilterSheet

const styles = StyleSheet.create({})
