import { RequestData } from '../requests/request.types'

export type OfferSentResponseType = {
  offer_sent: string
  responders: {
    id: string
    request_id: string
    user: User
    user_id: string
  }[]
}

export interface Approved extends Omit<RequestData, 'responder'> {
  responder: string
}

export type SentOfferResponseType = {
  pending: string
  approved: Approved[]
}

export type SubmitResponsePayload = {
  request_id: string
  comment: string
  media: FileType[]
}

export type EditResponsePayload = {
  request_id: string
  comment: string
  media: FileType[]
}
