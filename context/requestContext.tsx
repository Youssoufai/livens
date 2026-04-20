import { createContext, ReactNode, useContext, useState } from 'react'

export interface RequestState {
  location: string
  description: string
  duration: string
  allow_comment: '0' | '1'
  reward: number
}

interface RequestContextValue {
  request: RequestState
  requestId: string | null
  updateRequest: (data: Partial<RequestState>) => void
  resetRequest: () => void
  saveRequestId: (id: string) => void
}

const DEFAULT_REQUEST: RequestState = {
  location: '',
  description: '',
  duration: '',
  allow_comment: '1',
  reward: 1000,
}

const RequestContext = createContext<RequestContextValue | undefined>(undefined)

export function useRequest(): RequestContextValue {
  const ctx = useContext(RequestContext)
  if (!ctx) throw new Error('useRequest must be used within a RequestProvider')
  return ctx
}

export function RequestProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<RequestState>(DEFAULT_REQUEST)
  const [requestId, setRequestId] = useState<string | null>(null)

  const updateRequest = (data: Partial<RequestState>) => {
    setRequest((prev) => ({ ...prev, ...data }))
  }

  const resetRequest = () => {
    setRequest(DEFAULT_REQUEST)
    setRequestId(null)
  }

  const saveRequestId = (id: string) => {
    setRequestId(id)
  }

  return (
    <RequestContext.Provider value={{ request, updateRequest, resetRequest, requestId, saveRequestId }}>
      {children}
    </RequestContext.Provider>
  )
}
