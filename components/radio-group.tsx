import { StyleSheet, View } from 'react-native'
import * as RadioGroupPrimitive from '@rn-primitives/radio-group'
import { COLORS } from '@/constants/theme'

import { RadioGroupProps } from './components.types'
import Text from './text'

const RadioGroup = ({ name, list, value, onValueChange }: RadioGroupProps) => {
  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      style={styles.container}
    >
      {list.map((item, index) => {
        return (
          <RadioGroupPrimitive.Item
            value={item.value.toString()}
            style={styles.option}
            key={`${name}_radio_group_item_${index}`}
          >
            <View style={styles.optionTextWrapper}>
              <Text color="grey-600">{item.label}</Text>
            </View>
            <View style={styles.indicatorWrapper}>
              <RadioGroupPrimitive.Indicator style={styles.indicator} />
            </View>
          </RadioGroupPrimitive.Item>
        )
      })}
    </RadioGroupPrimitive.Root>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
    paddingTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    paddingVertical: 8,
  },
  optionTextWrapper: {
    flex: 1,
  },
  indicatorWrapper: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: COLORS.grey[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: '90%',
    height: '90%',
    borderRadius: 9999,
    backgroundColor: COLORS.primary[500],
  },
})

export default RadioGroup
