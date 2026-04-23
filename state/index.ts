import { create } from 'zustand'

import { AuthState } from './auth/auth.types'
import { createAuthSlice } from './auth/slice'
export const useBoundStore = create<AuthState>((...a) => ({
  ...createAuthSlice(...a),
}))
