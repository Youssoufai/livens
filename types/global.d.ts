import { COLORS } from '@/constants/theme'
import { ReactNode } from 'react'

global {
  type Direction = 'back' | 'forward'
  export interface User {
    id: string
    name: string
    email: string
    profile_photo?: string | null
    email_verified_at?: string | null
    phone?: string
    device_token?: string | null
    rating?: string
    completed_requests?: string
    location?: string | null
    balance?: string
    ledger?: string
    referral_code?: string
    referred_by?: string | null
    last_seen?: string | null
    created_at?: string
    updated_at?: string
  }
  interface NetworkResponse<T> {
    data?: T
    status: number
    error?: ApiErrorShape | string
    message?: string
  }

  interface ErrorObject {
    data: string | string[]
    error: string
    message: string
    status: 500
    success: false
    timestamp: string
  }

  type ApiErrorShape = {
    message?: string
    errors?: Record<string, unknown>
  }

  type ListItem = {
    id?: string
    label: string
    value: string | number
  }

  type FileType = {
    uri: string
    type: string
    name: string
  }

  type HeaderType = {
    title: string
    description?: ReactNode
  }

  type LocationType = {
    longitude: number
    latitude: number
    formattedAddress: string
  }

  type SheetContentType = {
    title: string
    description?: string
    index: number
    content: ReactNode
  }

  type Transaction = {
    id: number
    type: string
    reference: string | null
    amount: string
    email: string
    status: string
    created_at: string
    updated_at: string
  }

  type UserPreference = {
    pushEnabled: boolean
  }

  type ColorsType = typeof COLORS

  type FirstColorFieldType = keyof ColorsType

  type NestedColorFields = {
    [K in keyof ColorsType]: ColorsType[K] extends object
      ? keyof ColorsType[K]
      : never
  }

  type SecondColorFieldType<K extends FirstColorFieldType> =
    K extends keyof NestedColorFields ? NestedColorFields[K] : never

  type OnboardingType = 'IN_PROGRESS' | 'COMPLETED'
}

export {}
