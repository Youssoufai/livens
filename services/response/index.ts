import { API_ENDPOINTS } from '@/constants/endpoints'

import { AuthenticatedAPI } from '..'
import {
  EditResponsePayload,
  OfferSentResponseType,
  SentOfferResponseType,
  SubmitResponsePayload,
} from './response.types'
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

export const getSentOfferList = async () => {
  try {
    const response = await AuthenticatedAPI<SentOfferResponseType>(
      API_ENDPOINTS.response.sent_offers
    )

    return response.data
  } catch (error) {
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
  const formdata = new FormData()

  try {
    payload.media.forEach((file) => {
      formdata.append('media[]', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      } as any)
    })

    formdata.append('request_id', payload.request_id)
    formdata.append('comment', payload.comment)

    await AuthenticatedAPI.post(
      API_ENDPOINTS.response.submit_response,
      formdata,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    )
  } catch (error) {
    throw error
  }
}

export const editRequestResponse = async (payload: EditResponsePayload) => {
  const formdata = new FormData()

  try {
    payload.media.forEach((file) => {
      formdata.append('media[]', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      } as any)
    })

    formdata.append('comment', payload.comment)

    await AuthenticatedAPI.patch(
      API_ENDPOINTS.response.edit_response(payload.request_id),
      formdata,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
    )
  } catch (error) {
    throw error
  }
}
