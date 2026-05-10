import { API_ENDPOINTS } from '@/constants/endpoints'

import { AuthenticatedAPI } from '..'
import { InitiatePaymentResponse } from './payment.types'

export const initiateFund = async (amount: number) => {
  try {
    const response = await AuthenticatedAPI.post(
      API_ENDPOINTS.payment.initiate,
      { amount }
    )

    return (response.data.data || response.data.message) as
      | InitiatePaymentResponse
      | string
  } catch (error) {
    throw error
  }
}

export const verifyPayment = async (reference: string) => {
  try {
    await AuthenticatedAPI.get(
      API_ENDPOINTS.payment.verify + `TXN_${reference}`
    )
  } catch (error) {
    throw error
  }
}

export const intiateWithdrawal = async (amount: number) => {
  try {
    const response = await AuthenticatedAPI.post(
      API_ENDPOINTS.payment.withdraw,
      amount
    )

    return
  } catch (error) {
    throw error
  }
}
