import axios from 'axios'

import { CitiesType, Coordinates } from './services.type'
import { AuthenticatedAPI } from '.'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { catchErr } from '@/utils/error-handlers'
import { showToastMessage } from '@/components/notification'

export const getStates = async () => {
  try {
    const response = await axios.get(
      'https://temikeezy.github.io/nigeria-geojson-data/data/states.json'
    )

    return response.data as string[]
  } catch (error) {
    console.error(error)

    return []
  }
}

export const getCities = async (state: string, lga: string) => {
  try {
    const response = await axios.get(
      'https://temikeezy.github.io/nigeria-geojson-data/data/lgas-with-wards.json'
    )

    const cities = response.data[state][lga] as CitiesType[]

    return cities
  } catch (error) {
    console.error(error)

    return []
  }
}

export const getLocalGovernment = async (state: string) => {
  try {
    const response = await axios.get(
      'https://temikeezy.github.io/nigeria-geojson-data/data/lgas.json'
    )

    const lgas = response.data[state] as string[]

    return lgas
  } catch (error) {
    console.error(error)

    return []
  }
}

const getStraightLineDistance = (
  origin: Coordinates,
  destination: Coordinates
) => {
  const earthRadiusMeters = 6_371_000
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180
  const latitudeDelta = toRadians(destination.latitude - origin.latitude)
  const longitudeDelta = toRadians(destination.longitude - origin.longitude)
  const originLatitude = toRadians(origin.latitude)
  const destinationLatitude = toRadians(destination.latitude)
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(destinationLatitude) *
      Math.sin(longitudeDelta / 2) ** 2

  return (
    earthRadiusMeters *
    2 *
    Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  )
}

export const getDistance = async (
  origin: Coordinates,
  destination: Coordinates
) => {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY

  try {
    if (
      !Number.isFinite(origin.latitude) ||
      !Number.isFinite(origin.longitude) ||
      !Number.isFinite(destination.latitude) ||
      !Number.isFinite(destination.longitude)
    ) {
      throw new Error('Invalid coordinates provided to getDistance')
    }

    if (!apiKey) {
      throw new Error('Google Maps API key is not configured')
    }

    const response = await axios.post(
      'https://routes.googleapis.com/directions/v2:computeRoutes',
      {
        origin: {
          location: {
            latLng: {
              latitude: origin.latitude,
              longitude: origin.longitude,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: destination.latitude,
              longitude: destination.longitude,
            },
          },
        },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_UNAWARE',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask':
            'routes.distanceMeters,routes.localizedValues.distance.text',
        },
      }
    )

    const route = response.data.routes?.[0]
    const rawDistance = route?.distanceMeters

    if (typeof rawDistance === 'number' || typeof rawDistance === 'string') {
      const distance = Number(rawDistance)

      if (Number.isFinite(distance) && distance >= 0) return distance
    }

    const distanceText: string | undefined =
      route?.localizedValues?.distance?.text

    if (distanceText) {
      const distanceMatch = distanceText.match(/([\d.,]+)\s*(km|m|mi)?/i)
      const value = Number(distanceMatch?.[1]?.replace(/,/g, ''))
      const unit = distanceMatch?.[2]?.toLowerCase()

      if (Number.isFinite(value)) {
        if (!unit || unit === 'm') return value
        if (unit === 'km') return value * 1000
        if (unit === 'mi') return value * 1609.344
      }
    }

    return getStraightLineDistance(origin, destination)
  } catch (error) {
    return getStraightLineDistance(origin, destination)
  }
}

export const changeLocation = async (payload: LocationType) => {
  try {
    await AuthenticatedAPI.post(API_ENDPOINTS.auth.location, payload)
  } catch (error) {
    const errMsg = catchErr(error).message || ''
    showToastMessage(errMsg, 'error')
  }
}
