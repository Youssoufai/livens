import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group'
import { useState } from 'react'

import { ToggleGroupProps } from './components.types'
import Text from './text'
import { StyleSheet } from 'react-native'

function ToggleGroup({
  groupList,
  onSelect,
  containerStyle,
  buttonStyle,
  labelStyle,
}: ToggleGroupProps) {
  const [value, setValue] = useState<string>()

  const handleValueChange = (toggleValue: string | undefined) => {
    setValue(toggleValue)
    toggleValue && onSelect(toggleValue)
  }

  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value}
      onValueChange={handleValueChange}
      style={styles.container}
    >
      {groupList.map((item, index) => (
        <ToggleGroupPrimitive.Item value="bold" asChild>
          <Text>Bold</Text>
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
})

export default ToggleGroup
