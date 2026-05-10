import { StyleSheet, View } from 'react-native'
import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group'

import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import ScrollView from '@/components/scrollview'

import { SearchFilterProps } from '../search.types'
import { searchFilterOptions } from '../search.data'

const SearchFilter = ({ value, onValueChange }: SearchFilterProps) => {
  return (
    <ScrollView horizontal>
      <ToggleGroupPrimitive.Root
        type="single"
        style={styles.container}
        value={value}
        onValueChange={onValueChange}
      >
        {searchFilterOptions.map((item) => {
          return (
            <ToggleGroupPrimitive.Item
              key={item.value}
              value={item.value}
              style={styles.item}
            >
              <Text size={14} lineHeight={18} color="grey-500" weight={600}>
                {item.label}
              </Text>
            </ToggleGroupPrimitive.Item>
          )
        })}
      </ToggleGroupPrimitive.Root>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 8,
  },
  item: {
    borderWidth: 1,
    borderColor: COLORS.grey[200],
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
})

export default SearchFilter
