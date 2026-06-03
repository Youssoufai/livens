import { API_ENDPOINTS } from '@/constants/endpoints'
import AppStorage from '@/utils/storage'
import { STORE_KEYS } from '@/constants'
import { getPushSubscriptionId } from '@/lib/onesignal'
import { storePreference } from '@/modules/profile/profile.handlers'
import { catchErr } from '@/utils/error-handlers'

import { AuthenticatedAPI } from '..'
import {
  AccountItemType,
  AddAccountRequestType,
  Bank,
  RatingType,
} from './profile.types'

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

    return response.data.data as AccountItemType[]
  } catch (error) {
    throw error
  }
}

export const getBankList = async () => {
  try {
    const response = await AuthenticatedAPI<NetworkResponse<Bank[]>>(
      API_ENDPOINTS.profile.bank_list
    )

    const data = response?.data?.data?.map((item) => ({
      label: item.name,
      value: item.code,
    }))

    return data as ListItem[]
  } catch (error) {
    throw error
  }
}

export const getAccountName = async (
  bank_code: string,
  account_number: string
) => {
  try {
    const response = await AuthenticatedAPI.post(
      API_ENDPOINTS.profile.account_name,
      { bank_code, account_number }
    )

    return response.data.data as string
  } catch (error) {
    throw error
  }
}

export const addAccount = async (payload: AddAccountRequestType) => {
  try {
    const response = await AuthenticatedAPI.post(
      API_ENDPOINTS.profile.bank_account,
      payload
    )

    return response.data
  } catch (error) {
    throw error
  }
}

export const getTransactions = async () => {
  try {
    const response = await AuthenticatedAPI(API_ENDPOINTS.profile.transactions)

    return response.data.data as Transaction[]
  } catch (error) {
    throw error
  }
}

export const registerForPushNoft = async (
  storage: AppStorage,
  endpoint: string
) => {
  try {
    const storedPushToken = storage.getItem<'string'>(STORE_KEYS.preference)

    if (storedPushToken) return

    const pushId = await getPushSubscriptionId()

    if (!pushId) return

    const payload: { device_token: string } = { device_token: pushId }

    await AuthenticatedAPI.post(endpoint, payload)

    storage.setItem(STORE_KEYS.pushToken, pushId)
    storePreference(storage, { key: 'pushEnabled', value: true })
  } catch (error) {
    catchErr(error)
    throw error
  }
}
