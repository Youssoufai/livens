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

export const getUserById = async (id: string) => {
  try {
    const response = await AuthenticatedAPI(API_ENDPOINTS.profile.get_user(id))

    return response.data.data as User
  } catch (error) {
    throw error
  }
}

export const getAccountList = async () => {
  try {
    const response = await AuthenticatedAPI(API_ENDPOINTS.profile.accounts_list)

    return response.data
  } catch (error) {
    throw error
  }
}

export const getBankList = async () => {
  try {
    const response = await AuthenticatedAPI(API_ENDPOINTS.profile.bank_list)

    return response.data
  } catch (error) {
    throw error
  }
}

export const addAccount = async () => {
  try {
    const response = await AuthenticatedAPI.post(
      API_ENDPOINTS.profile.bank_account
    )

    return response.data
  } catch (error) {
    throw error
  }
}
