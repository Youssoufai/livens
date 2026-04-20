export interface User {
  id: number
  name: string
  email: string
  phone: string
  profile_photo: string | null
  balance: number | string
  location: string | null
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  access_token: string
  token?: string
  user: User
}

export interface ApiResponse<T = unknown> {
  status: 'success' | 'error'
  message: string
  data: T
}

export interface ProfileResponse extends ApiResponse<User> {}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
  phone: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface GoogleLoginPayload {
  id_token: string
}

export interface Request {
  id: number
  user_id: number
  location: string
  description: string
  duration: string
  allow_comment: '0' | '1'
  reward: number
  status: string
  user?: Pick<User, 'id' | 'name' | 'profile_photo'>
  responders?: Responder[]
}

export interface Responder {
  id: number
  user_id: number
  request_id: number
  status: string
  user?: Pick<User, 'id' | 'name' | 'profile_photo'>
}

export interface Message {
  id: number
  sender_id: number
  conversation_id: number
  message: string
  created_at: string
}

export interface BankAccount {
  bank_name: string
  account_number: string
  recipient_code: string
  amount: number
}
