import { catchErr, getEnhancedError } from '@/utils/error-handlers'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { CreateRequestFormData } from '@/state/request/request.types'

import { AuthenticatedAPI } from '..'
import { RequestData } from './request.types'

export const createRequest = async (payload: CreateRequestFormData) => {
  try {
    await AuthenticatedAPI.post(API_ENDPOINTS.requests.create, payload)
  } catch (error) {
    throw Error(error as any)
  }
}

export const getRequests = async () => {
  try {
    const { data } = await AuthenticatedAPI.get(API_ENDPOINTS.requests.fetch)

    return data.data as RequestData[]
  } catch (error) {
    throw Error(error as any)
  }
}

export const getRequestById = async (id: string) => {
  try {
    const { data } = await AuthenticatedAPI.get(
      API_ENDPOINTS.requests.details(id)
    )

    return data
  } catch (error) {
    throw Error(error as any)
  }
}
