import { COLORS } from '@/constants/theme'

global {
  interface NetworkResponse<T> {
    data?: T
    status: number
    error?: string
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

  type ListItem = {
    label: string
    value: string
  }

  type FileType = {
    uri: string
    type: string
    name: string
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
}

export {}
