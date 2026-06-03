import { StyleSheet, View } from 'react-native'
import { ChevronDown } from 'lucide-react-native'
import { useController } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'

import { COLORS } from '@/constants/theme'

import Dropdown from './dropdown'
import Input from './ui/input'
import { InputPropType } from './ui/ui.types'
import Text from './text'

type InputProps = InputPropType & {
  options: ListItem[]
  onChangeText?: (value: string) => void
}

const SelectInput = ({
  name,
  label,
  placeholder,
  value,
  defaultValue,
  options,
  control,
  onChangeText,
}: InputProps) => {
  const [inputValue, setInputValue] = useState('')

  const isRHFControlled = !!control && !!name

  const controller = isRHFControlled
    ? useController({ control, name, defaultValue })
    : null

  useEffect(() => {
    const option = options.find(
      (item) => item.value.toString() === defaultValue
    )

    if (option) {
      setInputValue(option.label)
      isRHFControlled
        ? controller?.field.onChange(defaultValue)
        : onChangeText?.(defaultValue ?? '')
    }
  }, [defaultValue, options, controller])

  const handleOptionSelect = (value: string) => {
    if (isRHFControlled) {
      controller?.field.onChange(value)
    } else {
      onChangeText?.(value)
    }
    const option = options.find((item) => item.value.toString() === value)
    setInputValue(option?.label ?? value)
  }

  return (
    <View style={styles.container}>
      <Text size={14} lineHeight={18} weight={600} color="grey-500">
        {label}
      </Text>
      <Dropdown
        anchor={
          <Input
            placeholder={placeholder}
            value={inputValue}
            editable={false}
            right={
              <TextInput.Icon
                icon={() => <ChevronDown size={24} color={COLORS.grey[300]} />}
              />
            }
          />
        }
        options={options}
        onSelectOption={handleOptionSelect}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
  },
})

export default SelectInput
