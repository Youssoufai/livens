import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

import Text from '@/components/text'
import { getToken } from '@/utils/secureStore'

export default function SearchScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken('token')
      if (!token) {
        router.replace('/(auth)/login' as never)
      } else {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#EF4444" />
      </View>
    )
  }

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('@/assets/images/search.png')}
        style={styles.hero}
        resizeMode="cover">
        <View style={styles.heroContent}>
          <Text size={30} weight={700} style={{ color: '#fff', lineHeight: 36 }}>
            Search a place in Abuja
          </Text>
          <Text size={15} style={{ color: '#F3F4F6', lineHeight: 22, marginBottom: 16, marginTop: 6 }}>
            Search any location to see what's happening there.
          </Text>

          <TouchableOpacity
            style={styles.searchBar}
            activeOpacity={0.85}
            onPress={() => router.push('/search/posts' as never)}>
            <Text size={15} color="grey-400">
              Search places, areas, events
            </Text>
            <Ionicons name="search" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.whiteSection}>
        <Text size={18} weight={700} color="grey-800" style={styles.sectionTitle}>
          Get started with Livelens
        </Text>
        <Text size={14} color="grey-400" style={styles.sectionDesc}>
          You can also start on your own and choose one of these options later.
        </Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => router.push('/search/posts' as never)}>
          <View style={styles.iconCircle}>
            <Ionicons name="search" size={20} color="#EF4444" />
          </View>
          <View style={styles.optionText}>
            <Text size={15} weight={600} color="grey-800">
              Search a place
            </Text>
            <Text size={13} color="grey-400" style={{ marginTop: 2, lineHeight: 18 }}>
              See the most recent news and updates about a place.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  hero: { height: 360, width: '100%' },
  heroContent: { flex: 1, padding: 20, justifyContent: 'flex-end', paddingBottom: 24 },
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
  whiteSection: { backgroundColor: '#fff', padding: 20, paddingTop: 24, minHeight: 400 },
  sectionTitle: { marginBottom: 6 },
  sectionDesc: { marginBottom: 20, lineHeight: 20 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionText: { flex: 1 },
})
