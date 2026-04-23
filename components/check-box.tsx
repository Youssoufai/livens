import { StyleSheet, View } from 'react-native'
import * as CheckboxPrimitive from '@rn-primitives/checkbox'

import { COLORS } from '@/constants/theme'

import { CheckboxProps } from './components.types'
import Text from './text'

export default function Checkbox({
  label,
  checked,
  alignLabel = 'right',
  onPress,
}: CheckboxProps) {
  const labelText = (
    <Text size={14} lineHeight={20} color="black">
      {label}
    </Text>
  )

  return (
    <CheckboxPrimitive.Root
      checked={checked}
      onCheckedChange={onPress}
      style={styles.container}
    >
      {alignLabel === 'left' && labelText}
      <View style={styles.checkbox}>
        <CheckboxPrimitive.Indicator
          style={styles.checked}
        ></CheckboxPrimitive.Indicator>
      </View>
      {alignLabel === 'right' && labelText}
    </CheckboxPrimitive.Root>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: COLORS.grey[100],
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checked: {
    width: '95%',
    height: '95%',
    backgroundColor: COLORS.primary[500],
    borderRadius: 3,
  },
})
