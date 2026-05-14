import { RequestData, RequestPayload } from '@/services/requests/request.types'

export type RequestDetailsType = {
  location: LocationType
  description: string
  duration: string
  allow_comment: boolean
  reward: string
}

export interface CreateRequestFormData extends RequestDetailsType {}

export interface RequestState {
  requestDetails?: Partial<CreateRequestFormData>
  updateRequest: (data: Partial<CreateRequestFormData>) => void
  resetRequest: () => void
}
