export type RequestResponderPayload = {
  request_id: string
  user_id: string
}

export type RequestPayload = {
  description: string
  duration: string
  allow_comment: boolean
  reward: string
  longitude: number
  latitude: number
  location: string
}

export type RequestStatusType =
  | 'pending'
  | 'active'
  | 'waiting for approval'
  | 'completed'
export interface RequestData extends LocationType {
  id: string
  description: string
  duration: string
  expiration: string // could be Date if you transform it
  allow_comment: boolean
  reward: string
  location?: string
  status: RequestStatusType
  make_public?: string | null
  user_id: string
  responder: null | string
  deleted_at: string | null
  created_at: string
  updated_at: string
  conversation_id: string | null
  user: User
}

export type RespondersType = {
  id: string
  user_id: string
  user: User
}

export type RequestResponseStatusType = {
  id: string
  request_id: string
  user_id: number
  comment: string
  media_paths: MediaType[]
  user: User
  created_at: string
  updated_at: string
}

export type MediaType = {
  public_id: string
  url: string
  type: string
}
