import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location'
import { router } from 'expo-router'
import { useState } from 'react'
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import Button from '@/components/ui/button'
import ProgressBar from '@/components/progress-bar'
import ScreenHeader from '@/components/screen-header'
import Text from '@/components/text'
import api from '@/lib/api'

interface Props {
  onNextStep?: () => void
}

export default function LocationSetup({ onNextStep }: Props) {
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const insets = useSafeAreaInsets()

  const updateLocation = async () => {
    const trimmedAddress = location?.trim()
    if (!trimmedAddress) {
      Alert.alert('Error', 'Location is required.')
      return
    }

    const backendLocation = trimmedAddress.replace(/,/g, ' ').replace(/\s+/g, ' ').trim()
    setIsLoading(true)

    try {
      await api.post('/update-location', { location: backendLocation })
      Alert.alert('Success', 'Location updated successfully!')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.replace('/(tabs)/search' as any)
      onNextStep?.()
    } catch {
      Alert.alert('Error', 'Unable to update location. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getCurrentLocation = async () => {
    try {
      setIsGettingLocation(true)
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required.')
        return
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      })

      const geocode = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })

      if (!geocode.length) throw new Error('Unable to resolve address')

      const a = geocode[0]
      const formattedAddress = [a.street, a.city, a.region, a.country].filter(Boolean).join(', ')
      setLocation(formattedAddress)
    } catch {
      Alert.alert('Error', 'Could not get your location. Please enter it manually.')
    } finally {
      setIsGettingLocation(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScreenHeader />
        <ProgressBar progress={66} />

        <View style={styles.content}>
          <Text size={24} weight={700} color="grey-800" style={styles.title}>
            Last step! Where do you live?
          </Text>
          <Text size={15} color="grey-500" style={styles.description}>
            We'll recommend requests with the best offers for you.
          </Text>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#999" style={styles.searchIcon} />
            <TextInput
              placeholder="Enter your address"
              placeholderTextColor="#999"
              style={styles.input}
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <TouchableOpacity
            style={styles.locationButton}
            onPress={getCurrentLocation}
            disabled={isGettingLocation}>
            <Ionicons
              name={isGettingLocation ? 'reload-outline' : 'location-outline'}
              size={18}
              color="#EF4444"
            />
            <Text size={14} color="danger" style={{ marginLeft: 6 }}>
              {isGettingLocation ? 'Getting location...' : 'Use current location'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonGroup, { paddingBottom: insets.bottom + 16 }]}>
          <Button
            label="Confirm"
            onPress={updateLocation}
            loading={isLoading}
            disabled={!location.trim() || isLoading}
          />
          <TouchableOpacity onPress={onNextStep} disabled={isLoading} style={{ marginTop: 12 }}>
            <Text size={14} weight={500} color="primary-300" align="center">
              Skip for now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 24,
    lineHeight: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  buttonGroup: {
    paddingTop: 8,
  },
})
