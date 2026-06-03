import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDebounce } from 'use-debounce'
import { Search } from 'lucide-react-native'
import { useEffect, useMemo, useRef, useState } from 'react'

import { API, AuthenticatedAPI } from '@/services'
import { COLORS } from '@/constants/theme'
import SearchFilter from '@/modules/search/components/search-filter'
import { generateArray } from '@/utils/generator'

import SearchInput from './search-input'
import FullScreenModal from './ui/modal'
import ScrollView from './scrollview'
import { SearchModalProps } from './components.types'
import Text from './text'
import { SkeletonLoader } from './skeleton-loader'

const EmptSearchResult = ({ search }: { search: string }) => {
  return (
    <View style={styles.emptyContainer}>
      <Search height={32} width={32} />
      <View style={styles.emptyTextWrapper}>
        <Text
          size={20}
          lineHeight={24}
          weight={600}
          color="black"
          align="center"
        >
          No results for “{search}”
        </Text>
        <Text size={16} lineHeight={24} color="grey-400" align="center">
          Try using different keywords or check your spelling.
        </Text>
      </View>
    </View>
  )
}

const SearchModal = ({
  endpoint,
  extraPayload,
  needsAuthentication,
  filterOption,
  onChangeOption,
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

  const searchData = loading ? generateArray<string>(6) : suggestions

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
          {/* <SearchFilter
            value={filterOption ?? ''}
            onValueChange={onChangeOption}
          /> */}
        </View>
        <ScrollView style={styles.scrollContent}>
          {loading ? (
            generateArray<string>(6, '').map((_, index) => (
              <SkeletonLoader
                key={`search_placeholder_${index}`}
                height={18}
                style={styles.loader}
              />
            ))
          ) : suggestions.length ? (
            suggestions.map((item, index) => {
              return (
                <Pressable
                  key={`${item.value}_${index}`}
                  style={({ pressed }) => [
                    styles.option,
                    suggestions.length - 1 === index && styles.onBorder,
                    pressed && { opacity: 0.75 },
                  ]}
                  onPress={() =>
                    onSelect(item?.id ?? item?.value.toString() ?? '')
                  }
                >
                  <Text size={16} lineHeight={24} weight={600} color="grey-600">
                    {item.label}
                  </Text>
                </Pressable>
              )
            })
          ) : search && !suggestions.length ? (
            <EmptSearchResult search={search} />
          ) : null}
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
    rowGap: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
  scrollContent: {
    rowGap: 16,
    paddingHorizontal: 16,
    marginTop: 16,
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
  loader: {
    width: '100%',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 24,
    flex: 1,
  },
  emptyTextWrapper: {
    rowGap: 8,
  },
})

export default SearchModal
