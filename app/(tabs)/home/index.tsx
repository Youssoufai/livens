import { router } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { useDebounce } from 'use-debounce'

import Text from '@/components/text'
import ParallaxScrollView from '@/components/parallax-scroll-view'
import { HOME_OPTIONS } from '@/modules/search/search.data'
import ActionRow from '@/components/action-row'
import SearchInput from '@/components/search-input-menu'
import { COLORS } from '@/constants/theme'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'

const MOCK_SUGGESTIONS = [
  'Wuse Market, Abuja',
  'Wuse Zone 4, Abuja',
  'Wuse Zone 5, Abuja',
  'Garki Area 1, Abuja',
  'Garki Area 2, Abuja',
  'Gwarinpa, Abuja',
  'Maitama, Abuja',
  'Asokoro, Abuja',
]

export default function SearchScreen() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedValue] = useDebounce(searchQuery, 1000)

  const suggestions = useMemo(() => {
    const querySuggestions = debouncedValue
      ? MOCK_SUGGESTIONS.filter((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : []

    return querySuggestions
  }, [debouncedValue])

  const headerImage = (
    <View style={styles.headerText}>
      <Text size={28} lineHeight={32} weight={700} color="white">
        Search a place in Abuja
      </Text>
      <Text size={16} lineHeight={24} color="white">
        Search any location to see what's happening there.
      </Text>
    </View>
  )

  const selectQueryItem = useCallback(async (item: string) => {
    setSearchQuery(item)
    try {
    } catch (error) {
      showToastMessage(catchErr(error).message ?? '', 'error')
    }
  }, [])

  return (
    <ImageBackground
      source={require('@/assets/images/search.png')}
      style={styles.hero}
      imageStyle={{ height: 336 }}
      resizeMode="cover"
    >
      <ParallaxScrollView
        headerImage={headerImage}
        headerheight={316}
        backgroundColor="transparent"
        contentBackgroundColor="white"
      >
        <View style={styles.main}>
          <SearchInput
            value={searchQuery}
            placeholder="Search places, areas, events"
            onChangeText={setSearchQuery}
            onClear={() => setSearchQuery('')}
            suggestions={suggestions}
            onSelectSuggestion={selectQueryItem}
          />

          <View>
            <Text
              size={20}
              lineHeight={24}
              weight={600}
              color="black"
              style={styles.sectionTitle}
            >
              Get started with Livelens
            </Text>
            <Text
              size={14}
              lineHeight={20}
              color="grey-400"
              style={styles.sectionDesc}
            >
              You can also start on your own and choose one of these options
              later.
            </Text>
          </View>

          <View style={styles.optionsRow}>
            {HOME_OPTIONS.map((option, index) => (
              <ActionRow
                key={`${option.title}_${index}`}
                title={option.title}
                description={option.description}
                link={option.link}
                icon={option.icon}
              />
            ))}
          </View>
        </View>
      </ParallaxScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  headerText: {
    rowGap: 4,
    paddingHorizontal: 16,
    paddingBottom: 13,
    justifyContent: 'flex-end',
    height: '100%',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hero: {
    width: '100%',
    flex: 1,
    backgroundColor: COLORS.white,
  },
  heroContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  main: {
    paddingHorizontal: 16,
    // paddingTop: 24,
    rowGap: 24,
  },
  optionsRow: {
    rowGap: 12,
  },
  sectionTitle: { marginBottom: 8 },
  sectionDesc: {},
})
