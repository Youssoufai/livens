import { catchErr, getEnhancedError } from '@/utils/error-handlers'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { CreateRequestFormData } from '@/state/request/request.types'

import { AuthenticatedAPI } from '..'
import {
  RequestData,
  RequestResponderPayload,
  RequestResponseStatusType,
  RespondersType,
} from './request.types'

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
    const response = await AuthenticatedAPI.get(
      API_ENDPOINTS.requests.details(id)
    )

    return response.data.data as RequestData
  } catch (error) {
    console.error(catchErr(error))

    throw Error(error as any)
  }
}

export const getRequestResponders = async (requestId: string) => {
  try {
    const response = await AuthenticatedAPI.get(
      API_ENDPOINTS.requests.get_responses(requestId)
    )

    return response.data.data as RespondersType[]
  } catch (error) {
    throw error
  }
}

export const approveRequestResponder = async (
  payload: RequestResponderPayload
) => {
  try {
    await AuthenticatedAPI.post(API_ENDPOINTS.requests.approve_reponse, payload)
  } catch (error) {
    throw error
  }
}

export const getResponseStatus = async (id: string) => {
  try {
    const response = await AuthenticatedAPI.get(
      API_ENDPOINTS.requests.get_response_status,
      {
        params: { reqid: id },
      }
    )

    return response.data.data as RequestResponseStatusType
  } catch (error) {
    throw error
  }
}
