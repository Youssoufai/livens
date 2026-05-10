import { TestFunction } from 'yup'
import parsePhoneNumberFromString from 'libphonenumber-js'
import { Platform } from 'react-native'
import * as Location from 'expo-location'

import { COLORS } from '@/constants/theme'

import { envConfig } from './config'

export const getResolvedColor = (color: string) => {
  const colors = color.split('-')

  const firstColorField = colors[0] as FirstColorFieldType
  const secondColorField = colors[1] as string | number | undefined

  let resolvedColor: string = '#ffffff'

  if (firstColorField && !secondColorField) {
    resolvedColor = COLORS[firstColorField] as string
  } else if (
    secondColorField &&
    typeof COLORS[firstColorField] === 'object' &&
    secondColorField in COLORS[firstColorField]
  ) {
    resolvedColor = (COLORS[firstColorField] as Record<string, string>)[
      secondColorField
    ]
  } else {
    resolvedColor = COLORS.white
  }

  return resolvedColor as string
}

export const getResolvedPhoneNumber: TestFunction<string | undefined> =
  function (value) {
    const createError = this.createError

    if (!value) {
      return createError({ message: 'Phone number is required' })
    }

    try {
      const phoneNumber = value.startsWith('+')
        ? parsePhoneNumberFromString(value)
        : parsePhoneNumberFromString(value, 'NG')

      // Check if the number is valid
      if (phoneNumber && !phoneNumber.isValid()) {
        return this.createError({ message: 'Phone number is not valid' })
      }

      const nationalNumber = phoneNumber?.nationalNumber
      if (
        nationalNumber &&
        (nationalNumber.length < 7 || nationalNumber.length > 13)
      ) {
        return createError({
          message: 'Phone number length is not valid',
        })
      }

      return true
    } catch (err) {
      return this.createError({ message: 'Phone number is not valid' })
    }
  }

export const getMapApiKey = () => {
  return Platform.select({
    // ios: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY_IOS,
    // android: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY_ANDROID,
    default: envConfig.googleMapApiKey,
  })
}

export const grantLocationPermission = async () => {
  const { status: permissionStatus } =
    await Location.getForegroundPermissionsAsync()

  let isGranted = permissionStatus === 'granted'

  if (!isGranted) {
    let { status } = await Location.requestForegroundPermissionsAsync()

    isGranted = status === 'granted'

    if (!isGranted) {
      return false
    }
  }

  return isGranted
}
