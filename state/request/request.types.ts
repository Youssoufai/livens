import { RequestData } from '@/services/requests/request.types'

export interface CreateRequestFormData extends RequestData {}

export interface RequestState {
  requestDetails?: Partial<CreateRequestFormData>
  updateRequest: (data: Partial<CreateRequestFormData>) => void
  resetRequest: () => void
}
