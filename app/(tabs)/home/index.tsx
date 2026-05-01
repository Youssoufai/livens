import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { ImageBackground, StyleSheet, Text as RNText, View } from 'react-native'

import Text from '@/components/text'
import ParallaxScrollView from '@/components/parallax-scroll-view'
import { HOME_OPTIONS } from '@/modules/search/search.data'
import ActionRow from '@/components/action-row'
import { COLORS } from '@/constants/theme'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import SearchModal from '@/components/search-modal'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { useBoundStore } from '@/state'

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const userLocation = useBoundStore((state) => state.user?.location)

  const location = userLocation?.replace(/(Nigeria|nigeria)/g, '')

  const headerImage = (
    <View style={styles.headerText}>
      <Text size={28} lineHeight={32} weight={700} color="white">
        Search a place in <RNText style={styles.location}>{location}</RNText>
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
          <SearchModal
            placeholder="Search places, areas, events"
            endpoint={API_ENDPOINTS.search.occassion}
            needsAuthentication
            onSelect={selectQueryItem}
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
  location: {
    textTransform: 'capitalize',
    textDecorationLine: 'underline',
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
    paddingBottom: 24,
    rowGap: 24,
  },
  optionsRow: {
    rowGap: 12,
  },
  sectionTitle: { marginBottom: 8 },
  sectionDesc: {},
})
