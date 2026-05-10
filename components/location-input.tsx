import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import GooglePlacesTextInput, {
  GooglePlacesTextInputStyles,
  Place,
} from 'react-native-google-places-textinput'
import { useEffect, useMemo, useState } from 'react'
import * as Location from 'expo-location'

import { getMapApiKey } from '@/utils/resolver'
import { COLORS } from '@/constants/theme'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
import { FONTS } from '@/constants/fonts'
import { INPUT_HEIGHT } from '@/constants'

import { type LocationInputProps } from './components.types'
import Text from './text'
import SearchIcon from './icons/search'

const LocationInput = ({
  defaultValue,
  defaultCoords,
  placeholder,
  label,
  labelStyle,
  onLocation,
}: LocationInputProps) => {
  const [value, setValue] = useState('')

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

  const handleLocationChange = (place: Place, sessionToken?: string | null) => {
    place?.details?.location &&
      onLocation({
        latitude: place.details.location.latitude,
        longitude: place.details.location.longitude,
        formattedAddress: place.details.formattedAddress,
      })
  }

  useEffect(() => {
    const getDefaultValue = async () => {
      let defaultName = defaultValue ?? ''
      if (!defaultValue && defaultCoords) {
        const location = {
          longitude: +defaultCoords.longitude,
          latitude: +defaultCoords.latitude,
        }
        const address = await Location.reverseGeocodeAsync(location)

        defaultName = defaultCoords.formattedAddress || (address[0].name ?? '')
      }

      setValue(defaultName)
    }

    getDefaultValue()
  }, [defaultValue, defaultCoords])

  return (
    <View style={styles.container}>
      {label && (
        <Text size={16} lineHeight={24} color="grey-500" style={labelStyle}>
          {label}
        </Text>
      )}
      <TextInput
        mode="outlined"
        outlineStyle={styles.nativePaperInput}
        render={() => (
          <GooglePlacesTextInput
            value={value}
            placeHolderText={placeholder ?? 'Search address'}
            onPlaceSelect={handleLocationChange}
            apiKey={getMapApiKey() || ''}
            fetchDetails
            languageCode="en"
            debounceDelay={400}
            selectionColor={COLORS.primary[600]}
            spellCheck
            cursorColor={COLORS.grey[500]}
            includedRegionCodes={['NG']}
            showClearButton={false}
            style={placesStyle}
          />
        )}
        left={
          <TextInput.Icon
            icon={() => (
              <SearchIcon width={28} height={28} fill={COLORS.grey[200]} />
            )}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
  },
  nativePaperInput: { borderWidth: 0 },
})

const googleLocationStyles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.grey[100],
    borderRadius: 4,
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 38,
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

export default LocationInput
