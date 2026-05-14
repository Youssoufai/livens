import { API_ENDPOINTS } from '@/constants/endpoints'

import { AuthenticatedAPI } from '..'
import { RatingType } from './profile.types'

export const rateUser = async (payload: RatingType) => {
  try {
    await AuthenticatedAPI.post(API_ENDPOINTS.profile.rating, payload)
  } catch (error) {
    throw error
  }
}
