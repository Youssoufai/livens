import { create } from 'zustand'

import { RequestState } from './request.types'

export const useRequestStore = create<RequestState>((set) => ({
  updateRequest(data) {
    set((state) => ({
      requestDetails: {
        ...state.requestDetails,
        ...data,
      },
    }))
  },
  resetRequest() {
    set({ requestDetails: undefined })
  },
}))
