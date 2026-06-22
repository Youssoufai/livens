import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDebounce } from 'use-debounce'
import { Search } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Portal } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GooglePlacesTextInputRef } from 'react-native-google-places-textinput'

import { COLORS } from '@/constants/theme'

import SearchInput from './search-input'
import { SearchModalProps } from './components.types'
import Text from './text'
import LocationInput from './location-input'

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
  placeholder,
  onChangeOption,
  onSelect,
}: SearchModalProps) => {
  const [search, setSearch] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const { top, bottom } = useSafeAreaInsets()

  const inputRef = useRef<GooglePlacesTextInputRef>(null)

  const router = useRouter()

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

  const handleLocation = (values: LocationType) => {
    setIsVisible(false)
    router.push({
      pathname: '/(search)/search-result',
      params: {
        location: JSON.stringify(values),
      },
    })
  }

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
              placeholder="Search places and areas around you"
              onChangeText={() => {}}
              onClear={clearSearch}
            />
          </View>
        </View>
      </View>
      <Portal>
        <Modal
          visible={isVisible}
          allowSwipeDismissal
          onRequestClose={() => setIsVisible(false)}
          onDismiss={() => setIsVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              { paddingTop: top, paddingBottom: bottom },
            ]}
          >
            <View style={styles.searchWrapper}>
              <LocationInput
                ref={inputRef}
                defaultValue={search}
                placeholder=""
                onLocation={handleLocation}
                inputContainerStyle={styles.searchInput}
              />
            </View>
            {/* <SearchFilter
            value={filterOption ?? ''}
            onValueChange={onChangeOption}
          /> */}
          </View>
        </Modal>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
  },
  modalContent: {
    paddingHorizontal: 0,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 16,
    rowGap: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.grey[50],
  },
  searchInput: {
    borderRadius: 30,
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
