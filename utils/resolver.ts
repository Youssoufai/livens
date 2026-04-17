import { TestFunction } from 'yup'

import { COLORS } from '@/constants/theme'
import parsePhoneNumberFromString from 'libphonenumber-js'

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
