import { API_ENDPOINTS } from '@/constants/endpoints'

import { AuthenticatedAPI } from '..'
import {
  GetMessagesResponseType,
  StartConversationResponseType,
} from './chat.types'

export const startConversation = async (
  participantIds: string[],
  requestId: string,
  title?: string
) => {
  try {
    const response = await AuthenticatedAPI.post<StartConversationResponseType>(
      API_ENDPOINTS.chat.start,
      {
        user_ids: participantIds,
        title: title ?? 'conversation',
        request_id: requestId,
      }
    )

    return response.data
  } catch (error) {
    throw error
  }
}

export const getConversations = async () => {
  try {
    await AuthenticatedAPI(API_ENDPOINTS.chat.get_conversions)
  } catch (error) {
    throw error
  }
}

export const getMessages = async (conversationId: string) => {
  try {
    const response = await AuthenticatedAPI<GetMessagesResponseType>(
      API_ENDPOINTS.chat.get_messages(conversationId)
    )

    return response.data
  } catch (error) {
    throw error
  }
}

export const sendMessage = async (conversationId: string, message: string) => {
  try {
    await AuthenticatedAPI.post(API_ENDPOINTS.chat.send_message, {
      conversation_id: conversationId,
      message,
    })
  } catch (error) {
    throw error
  }
}
