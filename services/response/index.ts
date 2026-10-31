import { API_ENDPOINTS } from '@/constants/endpoints'

import { AuthenticatedAPI } from '..'
import {
  EditResponsePayload,
  OfferSentResponseType,
  SentOfferResponseType,
  SubmitResponsePayload,
} from './response.types'
import { uploadMedia } from '../cloudinary'
import { catchErr } from '@/utils/error-handlers'

export const getOffersList = async (requestId: string) => {
  try {
    const response = await AuthenticatedAPI<OfferSentResponseType>(
      API_ENDPOINTS.response.offer_list(requestId)
    )

    return response.data
  } catch (error) {
    throw error
  }
}

export const getSentOfferList = async (offer: string) => {
  try {
    const response = await AuthenticatedAPI<SentOfferResponseType>(
      `${API_ENDPOINTS.response.sent_offers}?offer=${offer}`
    )

    return response.data
  } catch (error) {
    catchErr(error)

    throw error
  }
}

export const respondToRequest = async (request_id: string) => {
  try {
    const response = await AuthenticatedAPI.post(
      API_ENDPOINTS.response.response_to_request,
      { request_id }
    )
    return response.data
  } catch (error) {
    throw error
  }
}

// export const withdrawResponse = async (requestId: string) => {
//   try {
//     await AuthenticatedAPI.post(API_ENDPOINTS.requests.withdrawResponder, {
//       request_id: requestId,
//     })
//   } catch (error) {
//     throw error
//   }
// }

export const submitRequestResponse = async (payload: SubmitResponsePayload) => {
  try {
    const transformedMedia = await Promise.all(
      payload.media.map((item) => uploadMedia(item))
    )

    const requestPayload = {
      request_id: payload.request_id,
      media: transformedMedia,
      comment: payload.comment,
    }

    await AuthenticatedAPI.post(
      API_ENDPOINTS.response.submit_response,
      requestPayload
    )
  } catch (error) {
    throw error
  }
}

export const editRequestResponse = async (payload: EditResponsePayload) => {
  try {
    const resolvedMedia = await Promise.all(
      payload.media.map((item) => ('uri' in item ? uploadMedia(item) : item))
    )

    const requestPayload = {
      media: resolvedMedia,
      comment: payload.comment,
    }

    await AuthenticatedAPI.patch(
      API_ENDPOINTS.response.edit_response(payload.response_id),
      requestPayload
    )
  } catch (error) {
    throw error
  }
}
