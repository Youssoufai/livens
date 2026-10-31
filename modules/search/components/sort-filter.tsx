import RadioGroup from '@/components/radio-group'

import { SORT_OPTIONS } from '../search.data'
import { SortFilterProps } from '../search.types'

const SortFilter = ({ value, onChange }: SortFilterProps) => {
  return (
    <RadioGroup
      name="sort"
      list={SORT_OPTIONS}
      value={value}
      onValueChange={onChange}
    />
  )
}

export default SortFilter
