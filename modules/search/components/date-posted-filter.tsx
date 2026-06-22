import { StyleSheet } from 'react-native'

import RadioGroup from '@/components/radio-group'

import { DatePostedFilterProps } from '../search.types'
import { DATE_FILTER_OPTIONS } from '../search.data'

const DatePostedFilter = ({ value, onChange }: DatePostedFilterProps) => {
  return (
    <RadioGroup
      name="date-posted"
      list={DATE_FILTER_OPTIONS}
      value={value}
      onValueChange={onChange}
    />
  )
}

export default DatePostedFilter
