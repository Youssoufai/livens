import { create, StateCreator } from 'zustand'

import { API_ENDPOINTS } from '@/constants/endpoints'
import { API, AuthenticatedAPI } from '@/services'
import { catchErr } from '@/utils/error-handlers'

import {
  AccountCreationState,
  AuthState,
  BusinessFormDetailsState,
  FormAction,
} from './auth.types'

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (
  set,
  get
) => ({
  isAuthenticated: false,
  biometricTriedThisSession: false,
  loading: false,

  async getUser() {
    try {
      const response = await AuthenticatedAPI.get(API_ENDPOINTS.auth.profile)

      set({ user: response.data.data, isAuthenticated: true })
    } catch (error) {
      throw error
    }
  },
  updateBalance(amount, type = 'increase') {
    set((state) => {
      if (!state.user) return state

      const balance = +(state.user.balance ?? 0)
      const newBalance =
        type === 'increase'
          ? String(balance + amount)
          : balance < amount
            ? 0
            : balance - amount

      return {
        user: {
          ...state.user,
          balance: newBalance.toString(),
        },
      }
    })
  },
  logout: () => {
    set({ isAuthenticated: false, user: undefined })
  },
})

export const useBusinessSetupStore = create<
  BusinessFormDetailsState & FormAction<BusinessFormDetailsState>
>()((set) => ({
  updateFields(fields) {
    set(() => ({ ...fields }))
  },
  clearFields() {
    set({
      logo: undefined,
      businessEmail: '',
      businessName: '',
      phone: '',
      type: '',
      address: '',
      city: '',
      localGovernment: '',
      state: '',
    })
  },
}))

export const useAccountCreationStore = create<
  AccountCreationState & FormAction<AccountCreationState>
>()((set) => ({
  updateFields(fields) {
    set(() => ({ ...fields }))
  },
  clearFields() {
    set({
      firstName: '',
      lastName: '',
      email: '',
      region: '',
      password: '',
      confirmPassword: '',
    })
  },
}))
