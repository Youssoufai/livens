export type StartConversationResponseType = {
  id: string
}

export type MessageSender = {
  id: number
  name: string
  email: string
  profile_photo: string | null
  email_verified_at: string | null
  phone: string
  device_token: string | null
  rating: string
  completed_requests: string
  latitude: string
  longitude: string
  location: string
  balance: string
  ledger: string
  referral_code: string
  referred_by: string | null
  last_seen: string | null
  created_at: string
  updated_at: string
}

export type Message = {
  id: string
  conversation_id: string
  sender_id: string
  message: string
  meta?: Record<string, unknown> | null
  read_at?: string | null
  created_at?: string
  updated_at?: string
  sender?: MessageSender
}

export type GetMessagesResponseType = Message[]
