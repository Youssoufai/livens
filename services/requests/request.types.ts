export type RequestResponderPayload = {
  request_id: string
  user_id: string
}

export type RequestPayload = {
  location: string
  description: string
  duration: string
  allow_comment: boolean
  reward: string
}

export type RequestData = {
  id: string
  location: string
  description: string
  duration: string
  expiration: string // could be Date if you transform it
  allow_comment: boolean
  reward: string
  status: 'pending' | 'approved' | 'completed' | 'cancelled' // extend if needed
  user_id: string
  responder: null | { name: string; location: string } // update when backend shape is known
  deleted_at: string | null
  created_at: string
  updated_at: string
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
  media_paths: string[]
  created_at: string
  updated_at: string
}
