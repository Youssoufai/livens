import { useEffect, useState } from 'react'
import { LocationGeocodedAddress, reverseGeocodeAsync } from 'expo-location'

import { grantLocationPermission } from '@/utils/resolver'

export function useReverseGeoCoding(
  location: Omit<LocationType, 'formattedAddress'>
) {
  const [locationDetails, setLocationDetails] =
    useState<LocationGeocodedAddress[]>()

  useEffect(() => {
    const getLocation = async () => {
      const isGranted = await grantLocationPermission()

      if (isGranted) {
        const details = await reverseGeocodeAsync(location)

        setLocationDetails(details)
      }
    }

    getLocation()
  }, [location])

  return locationDetails?.[0]
}
