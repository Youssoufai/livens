import { catchErr, getEnhancedError } from '@/utils/error-handlers'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { CreateRequestFormData } from '@/state/request/request.types'

import { AuthenticatedAPI } from '..'
import {
  RequestData,
  RequestPayload,
  RequestResponderPayload,
  RequestResponseStatusType,
  RespondersType,
} from './request.types'

export const createRequest = async (payload: RequestPayload) => {
  try {
    await AuthenticatedAPI.post(API_ENDPOINTS.requests.create, payload)
  } catch (error) {
    throw error
  }
}

export const editRequest = async (
  payload: RequestPayload & { request_id: string }
) => {
  try {
    await AuthenticatedAPI.post(API_ENDPOINTS.requests.edit, payload)
  } catch (error) {
    throw error
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

export const makeRequestPublic = async (id: string) => {
  try {
    await AuthenticatedAPI.patch(API_ENDPOINTS.requests.setAsPublic(id))
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
      API_ENDPOINTS.requests.get_response_status(id)
    )

    return response.data as {
      request: RequestData
      response: RequestResponseStatusType
    }
  } catch (error) {
    throw error
  }
}

export const completeRequest = async (id: string) => {
  try {
    await AuthenticatedAPI.post(API_ENDPOINTS.requests.complete, {
      request_id: id,
    })
  } catch (error) {
    throw error
  }
}

export const cancelRequest = async (requestId: string) => {
  try {
    await AuthenticatedAPI.post(API_ENDPOINTS.requests.cancel, {
      request_id: requestId,
    })
  } catch (error) {
    throw error
  }
}

export const withdrawResponder = async (requestId: string) => {
  try {
    await AuthenticatedAPI.post(API_ENDPOINTS.requests.withdrawResponder, {
      request_id: requestId,
    })
  } catch (error) {
    throw error
  }
}
