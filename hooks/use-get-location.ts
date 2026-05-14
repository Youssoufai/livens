import * as Location from 'expo-location'
import { useEffect, useMemo, useState } from 'react'

export default function useGetLocation() {
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject>()
  const [address, setAddress] = useState<Location.LocationGeocodedAddress>()

  async function getCurrentLocation(): Promise<{
    location: Location.LocationObject | null
    address: string | null
  }> {
    let location: Location.LocationObject | null = null
    try {
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

      if (!location) throw Error('No location found')

      const address = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      })

      setAddress(address[0])
      setCurrentLocation(location)
      return { address: address[0].formattedAddress, location }
    } catch (error) {
      console.error(error)
      return { location, address: null }
    }
  }

  return useMemo(
    () => ({ currentLocation, address, getCurrentLocation }),
    [currentLocation, address, getCurrentLocation]
  )
}
