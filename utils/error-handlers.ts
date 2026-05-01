import { AxiosError } from 'axios'

const defaultStatus = 400

const normalizeResponseData = (data: unknown): ApiErrorShape => {
  if (!data) return {}

  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch {
      return { message: data }
    }
  }

  return data as ApiErrorShape
}

const extractFirstError = (errors: unknown): string | undefined => {
  if (!errors || typeof errors !== 'object') return undefined

  for (const value of Object.values(errors as Record<string, unknown>)) {
    if (!value) continue

    if (Array.isArray(value)) {
      const first = value.find(Boolean)
      if (typeof first === 'string') return first
    }

    if (typeof value === 'string') {
      return value
    }

    if (typeof value === 'object') {
      const nested = extractFirstError(value)
      if (nested) return nested
    }
  }

  return undefined
}

export const handleAxiosErrors = (
  error: Error | AxiosError
): NetworkResponse<undefined> => {
  const axiosErr = error instanceof AxiosError
  if (axiosErr && error.response) {
    const statusCode = error.response.status
    const parsed = normalizeResponseData(error.response.data)

    const message =
      parsed.message ||
      extractFirstError(parsed.errors) ||
      'Something went wrong'

    // optional: don’t mutate axios response (avoid side effects)
    const normalizedError = {
      status: statusCode,
      message,
      error: parsed,
    }
    console.log({ errMsg: message })

    if (statusCode >= 500) {
      return {
        ...normalizedError,
        message: 'Our server is having troubles. Please try again later',
      }
    }

    if (statusCode === 404) {
      return {
        ...normalizedError,
        message: 'Unable to complete your request. Try again later.',
      }
    }

    return normalizedError
  } else if (axiosErr && error.request) {
    console.log(error.request)

    return {
      error: 'Connection Error',
      message: 'No internet connection found. Please, check your network.',
      status: defaultStatus,
    }
  } else {
    return {
      error: 'Unexpected Error',
      message: error.message,
      status: defaultStatus,
    }
  }
}

export const catchErr = (
  fallbackError: unknown,
  fallbackMessage: string | undefined = 'An error occured'
) => {
  if (fallbackError instanceof Error || fallbackError instanceof AxiosError) {
    return handleAxiosErrors(fallbackError)
  }

  return {
    status: defaultStatus,
    error: 'Error',
    message: fallbackMessage,
  }
}

export const handleErrorInstances = (
  error: unknown,
  defaultMsg: string = 'Something went wrong. Please try again.'
) => {
  if (!error) return ''

  if (error instanceof Error) {
    return error.message
  }

  if (error instanceof AxiosError) {
    if (error.request) {
      return 'Network error'
    } else if (error.response) {
      return (
        error.response.data.message ||
        error.response.data.error ||
        error.message
      )
    } else {
      return defaultMsg
    }
  }

  const reqError = error as ErrorObject

  if (reqError?.data) {
    if (Array.isArray(reqError?.data)) {
      return reqError?.data[0]
    } else if (typeof reqError?.data === 'string') {
      return reqError?.data || defaultMsg
    }
  } else if (reqError.message) {
    return reqError.message
  }

  return defaultMsg
}

export const getEnhancedError = (error: unknown, defaultMsg?: string) => {
  const { message, status } = catchErr(error)
  const enhancedError = new Error(message)
  ;(enhancedError as any).status = status

  throw enhancedError
}
