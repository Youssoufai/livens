import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDebounce } from 'use-debounce'
import { useEffect, useMemo, useRef, useState } from 'react'

import { API, AuthenticatedAPI } from '@/services'
import { COLORS } from '@/constants/theme'

import SearchInput from './search-input'
import FullScreenModal from './ui/modal'
import ScrollView from './scrollview'
import { SearchModalProps } from './components.types'
import Text from './text'

const SearchModal = ({
  endpoint,
  extraPayload,
  needsAuthentication,
  onSelect,
}: SearchModalProps) => {
  const [search, setSearch] = useState('')
  const [suggestions, setSuggestions] = useState<ListItem[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const inputRef = useRef<TextInput>(null)

  const [debouncedValue] = useDebounce(search, 1000)

  const clearSearch = () => {
    setSearch('')
  }

  const startSearch = () => {
    setIsVisible(true)
  }

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus()
      }, 150)

      return () => clearTimeout(timeout)
    }
  }, [isVisible])

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        setLoading(true)
        if (debouncedValue && endpoint) {
          const response = await (
            needsAuthentication ? AuthenticatedAPI : API
          ).post(endpoint, { search: debouncedValue, ...extraPayload })

          return []
        }
      } catch (error) {
        return []
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResult()
  }, [debouncedValue, endpoint, needsAuthentication, extraPayload])

  return (
    <>
      <View>
        <View style={styles.inputWrapper}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={0.75}
            onPress={startSearch}
          />
          <View pointerEvents="none">
            <SearchInput
              value={search}
              onChangeText={() => {}}
              onClear={clearSearch}
            />
          </View>
        </View>
      </View>
      <FullScreenModal
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}
        contentStyle={styles.modalContent}
      >
        <View style={styles.searchWrapper}>
          <SearchInput
            ref={inputRef}
            value={search}
            onChangeText={setSearch}
            onClear={clearSearch}
          />
        </View>
        <ScrollView>
          {suggestions.map((item, index) => (
            <Pressable
              key={`${item.value}_${index}`}
              style={({ pressed }) => [
                styles.option,
                suggestions.length - 1 === index && styles.onBorder,
                pressed && { opacity: 0.75 },
              ]}
              onPress={() => onSelect(item?.id ?? item?.value.toString() ?? '')}
            >
              <Text size={16} lineHeight={24} weight={600} color="grey-600">
                {item.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </FullScreenModal>
    </>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
  },
  modalContent: {
    paddingHorizontal: 0,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
  onBorder: {
    borderBottomWidth: 0,
  },
})

export default SearchModal
