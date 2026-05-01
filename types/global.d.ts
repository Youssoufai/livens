import { COLORS } from '@/constants/theme'
import { ReactNode } from 'react'

global {
  type Direction = 'back' | 'forward'
  export interface User {
    id: number
    name: string
    email: string
    phone: string
    profile_photo?: string | null
    balance?: number | string
    location: string | null
    created_at: string
    updated_at: string
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
