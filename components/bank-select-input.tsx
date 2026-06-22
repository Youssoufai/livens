import { ChevronDown, X } from 'lucide-react-native'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import { Menu, TextInput as PaperTextInput } from 'react-native-paper'
import { useController } from 'react-hook-form'

import { COLORS } from '@/constants/theme'
import { FONTS } from '@/constants/fonts'
import { actuateFontSize } from '@/utils/normalize'
import { InputPropType } from './ui/ui.types'
import Input from './ui/input'
import Text from './text'
import SearchIcon from './icons/search'

type BankSelectInputProps = InputPropType & {
  options: ListItem[]
  onChangeText?: (value: string) => void
}

const MAX_LIST_HEIGHT = 220
const SEARCH_HEIGHT = 48

const BankSelectInput = ({
  name,
  label,
  placeholder,
  defaultValue,
  options,
  control,
  onChangeText,
}: BankSelectInputProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [displayValue, setDisplayValue] = useState('')
  const [triggerWidth, setTriggerWidth] = useState(0)

  const isRHFControlled = !!control && !!name
  const controller = isRHFControlled
    ? useController({ control, name, defaultValue })
    : null

  useEffect(() => {
    const option = options.find(
      (item) => item.value.toString() === defaultValue
    )
    if (option) {
      setDisplayValue(option.label)
      isRHFControlled
        ? controller?.field.onChange(defaultValue)
        : onChangeText?.(defaultValue ?? '')
    }
  }, [defaultValue, options])

  const filteredOptions = useMemo(
    () =>
      searchQuery.trim()
        ? options.filter((item) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : options,
    [options, searchQuery]
  )

  const handleClose = useCallback(() => {
    setSearchQuery('')
    setShowMenu(false)
  }, [])

  const handleSelect = useCallback(
    (item: ListItem) => {
      if (isRHFControlled) {
        controller?.field.onChange(item.value.toString())
      } else {
        onChangeText?.(item.value.toString())
      }
      setDisplayValue(item.label)
      handleClose()
    },
    [isRHFControlled, controller, onChangeText, handleClose]
  )

  return (
    <View
      style={styles.container}
      onLayout={(e) => setTriggerWidth(e.nativeEvent.layout.width)}
    >
      <Text size={14} lineHeight={18} weight={600} color="grey-500">
        {label}
      </Text>

      <Menu
        visible={showMenu}
        onDismiss={handleClose}
        contentStyle={[styles.menuContent, { width: triggerWidth }]}
        anchor={
          <Pressable onPress={() => setShowMenu(true)}>
            <View pointerEvents="none">
              <Input
                placeholder={placeholder}
                value={displayValue}
                editable={false}
                addBottomPadding={false}
                right={
                  <PaperTextInput.Icon
                    icon={() => (
                      <ChevronDown size={24} color={COLORS.grey[300]} />
                    )}
                  />
                }
              />
            </View>
          </Pressable>
        }
      >
        <View style={styles.searchWrapper}>
          <SearchIcon fill={COLORS.grey[300]} width={20} height={16} />
          <TextInput
            placeholder="Search bank..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholderTextColor={COLORS.grey[300]}
            autoFocus
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} hitSlop={8}>
              <X size={20} color={COLORS.grey[400]} />
            </Pressable>
          )}
        </View>

        <View style={styles.divider} />

        <ScrollView
          style={styles.list}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {filteredOptions.length === 0 ? (
            <View style={styles.emptyState}>
              <Text size={14} lineHeight={20} color="grey-400" weight={500}>
                No banks found
              </Text>
            </View>
          ) : (
            filteredOptions.map((item, index) => (
              <Pressable
                key={`${item.value}_${index}`}
                onPress={() => handleSelect(item)}
                style={styles.menuItem}
              >
                <Text size={15} weight={600} color="grey-600" lineHeight={22}>
                  {item.label}
                </Text>
              </Pressable>
            ))
          )}
        </ScrollView>
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
  },
  menuContent: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingVertical: 0,
    overflow: 'hidden',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    paddingHorizontal: 12,
    height: SEARCH_HEIGHT,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.dm_sans[400],
    fontSize: actuateFontSize(14),
    color: COLORS.grey[600],
    paddingVertical: 0,
    height: SEARCH_HEIGHT,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grey[50],
    // marginBottom: 12,
  },
  list: {
    maxHeight: MAX_LIST_HEIGHT,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[50],
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: 'center',
  },
})

export default BankSelectInput
