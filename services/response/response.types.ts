import { RequestData } from '../requests/request.types'

export type OfferSentResponseType = {
  offer_sent: string
  responders: {
    name: string
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
