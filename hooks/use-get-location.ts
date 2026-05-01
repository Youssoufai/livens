import * as Location from 'expo-location'
import { useEffect, useMemo, useState } from 'react'

export default function useGetLocation() {
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject>()
  const [address, setAddress] = useState<Location.LocationGeocodedAddress>()

  async function getCurrentLocation() {
    try {
      let location: Location.LocationObject | null = null

      const { status: permissionStatus } =
        await Location.getForegroundPermissionsAsync()

      let isGranted = permissionStatus === 'granted'

      if (!isGranted) {
        let { status } = await Location.requestForegroundPermissionsAsync()

        isGranted = status === 'granted'

        if (!isGranted) {
          throw Error('Location permission was denied')
        }
      }

      location = await Location.getCurrentPositionAsync({})

      if (!location) return

      const address = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      })

      setAddress(address[0])
      setCurrentLocation(location)
      return address[0].formattedAddress
    } catch (error) {
      console.error(error)
      return ''
    }
  }

  return useMemo(
    () => ({ currentLocation, address, getCurrentLocation }),
    [currentLocation, address, getCurrentLocation]
  )
}
