import { useCallback, useRef } from 'react'
import { useFocusEffect } from 'expo-router'

import AppStorage from '@/utils/storage'
import { getDistance } from '@/services/location'
import useGetLocation from '@/hooks/use-get-location'
import { Coordinates } from '@/services/services.type'
import { STORE_KEYS } from '@/constants'
import { AuthenticatedAPI } from '@/services'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { useBoundStore } from '@/state'

const UpdateLocation = () => {
  const storage = useRef(new AppStorage()).current

  const userId = useBoundStore((state) => state.user?.id)

  const { getCurrentLocation } = useGetLocation()

  useFocusEffect(
    useCallback(() => {
      ;(async function () {
        const preferenceKey = `${STORE_KEYS.preference}_${userId}`
        const storedPreference = storage.getItem<'string'>(preferenceKey)
        const preference = storedPreference
          ? (JSON.parse(storedPreference) as UserPreference)
          : null

        if (!preference?.autoLocation) return

        const storedCoord = storage.getItem<'string'>(
          `${STORE_KEYS.auto_location}_${userId}`
        )
        const originCoord = storedCoord
          ? (JSON.parse(storedCoord) as Coordinates)
          : null

        if (!originCoord) return

        const currentLocation = await getCurrentLocation()

        if (!currentLocation.location) return

        const destCoord = {
          latitude: currentLocation.location.coords.latitude,
          longitude: currentLocation.location.coords.longitude,
        }

        const distance = await getDistance(originCoord, destCoord)

        if (distance < 500) return

        storage.setItem(
          `${STORE_KEYS.auto_location}_${userId}`,
          JSON.stringify(destCoord)
        )
        const destLocation = { ...destCoord, location: currentLocation.address }

        await AuthenticatedAPI.post(API_ENDPOINTS.auth.location, destLocation)
      })()
    }, [userId])
  )

  return <></>
}

export default UpdateLocation
