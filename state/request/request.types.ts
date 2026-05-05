import { RequestData, RequestPayload } from '@/services/requests/request.types'

export interface CreateRequestFormData extends RequestPayload {}

export interface RequestState {
  requestDetails?: Partial<CreateRequestFormData>
  updateRequest: (data: Partial<CreateRequestFormData>) => void
  resetRequest: () => void
}
