import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { LocateFixed } from 'lucide-react-native'
import GooglePlacesTextInput, {
  GooglePlacesTextInputStyles,
  Place,
} from 'react-native-google-places-textinput'
import { useRouter } from 'expo-router'
import { ActivityIndicator, TextInput } from 'react-native-paper'

import { COLORS } from '@/constants/theme'
import Text from '@/components/text'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
import { FONTS } from '@/constants/fonts'
import Button from '@/components/ui/button'
import useGetLocation from '@/hooks/use-get-location'
import { getMapApiKey } from '@/utils/resolver'
import { INPUT_HEIGHT } from '@/constants'
import SearchIcon from '@/assets/icons/search.svg'
import { showToastMessage } from '@/components/notification'
import { catchErr, handleErrorInstances } from '@/utils/error-handlers'
import { API, AuthenticatedAPI } from '@/services'
import { API_ENDPOINTS } from '@/constants/endpoints'

const LocationForm = () => {
  const [location, setLocation] = useState<LocationType>()
  const [address, setAddress] = useState('')
  const [isLoadingAddr, setIsLoadingAddr] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const { getCurrentLocation } = useGetLocation()

  const handleLocationChange = (place: Place, sessionToken?: string | null) => {
    place?.details?.location &&
      setLocation({
        latitude: place.details.location.latitude,
        longitude: place.details.location.longitude,
        formattedAddress: place.details.formattedAddress,
      })
  }

  const handleCurrentLocation = async () => {
    try {
      setIsLoadingAddr(true)
      const { location, address } = await getCurrentLocation()

      if (!location?.coords.latitude) return

      setLocation({
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
        formattedAddress: address ?? '',
      })
    } catch (error) {
      showToastMessage(handleErrorInstances(error), 'error')
    } finally {
      setIsLoadingAddr(false)
    }
  }

  const confirmLocation = async () => {
    try {
      setLoading(true)
      const payload = {
        longitude: location?.longitude,
        latitude: location?.latitude,
        location: location?.formattedAddress,
      }
      await AuthenticatedAPI.post(API_ENDPOINTS.auth.location, payload)

      router.replace('/(auth)/success')
    } catch (error) {
      const errMsg = catchErr(error).message || ''
      showToastMessage(errMsg, 'error')
    } finally {
      setLoading(false)
    }
  }

  const placesStyle: GooglePlacesTextInputStyles = useMemo(
    () => ({
      ...googleLocationStyles,
      suggestionText: {
        main: {
          fontSize: actuateFontSize(15),
          lineHeight: actuateLineHeight(15, 20),
          color: COLORS.grey[500],
          fontFamily: FONTS.dm_sans[500],
        },
        secondary: {
          color: COLORS.grey[300],
          fontFamily: FONTS.dm_sans[400],
        },
      },
    }),
    []
  )

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.locationWrapper}>
          <TextInput
            mode="outlined"
            outlineStyle={styles.nativePaperInput}
            render={() => (
              <GooglePlacesTextInput
                value={location?.formattedAddress}
                placeHolderText="Search address"
                onPlaceSelect={handleLocationChange}
                apiKey={getMapApiKey() || ''}
                fetchDetails
                languageCode="en"
                debounceDelay={400}
                selectionColor={COLORS.primary[600]}
                spellCheck
                includedRegionCodes={['NG']}
                showClearButton={false}
                style={placesStyle}
              />
            )}
            right={<TextInput.Icon icon={() => <SearchIcon />} />}
          />
          <View style={styles.locationBtnWrapper}>
            <Pressable
              style={({ pressed }) => [
                styles.locationSelector,
                pressed && { opacity: 0.75 },
              ]}
              onPress={handleCurrentLocation}
            >
              <LocateFixed size={16} color={COLORS.primary[600]} />
              <Text size={14} lineHeight={16} weight={600} color="primary-600">
                Use current location
              </Text>
            </Pressable>
            {isLoadingAddr && (
              <ActivityIndicator color={COLORS.primary[500]} size={24} />
            )}
          </View>
        </View>
      </View>
      <Button
        label="Confirm"
        disabled={!location}
        loading={loading}
        onPress={confirmLocation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    columnGap: 2,
  },
  main: {
    flex: 1,
  },
  nativePaperInput: { borderWidth: 0 },
  locationWrapper: {
    rowGap: 26,
  },
  locationBtnWrapper: {
    flexDirection: 'row',
    columnGap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const googleLocationStyles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 4,
    alignItems: 'center',
    paddingRight: 16,
  },
  input: {
    fontSize: actuateFontSize(16),
    lineHeight: actuateLineHeight(16, 24),
    color: COLORS.grey[700],
    fontFamily: FONTS.dm_sans[400],
    height: INPUT_HEIGHT,
  },
  placeholder: {
    color: COLORS.grey[300],
  },
})

export default LocationForm
