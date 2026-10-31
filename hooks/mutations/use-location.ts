import { useMutation } from '@tanstack/react-query'

import AppStorage from '@/utils/storage'
import { changeLocation } from '@/services/location'

export const useUpdateLocation = async (location: LocationType) => {
  return useMutation({
    mutationFn: () => changeLocation(location),
  })
}
