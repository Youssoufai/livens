import { API_ENDPOINTS } from '@/constants/endpoints'

import { AuthenticatedAPI } from '..'
import { InitiatePaymentResponse, WithdrawalRequestType } from './payment.types'

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

export const intiateWithdrawal = async (payload: WithdrawalRequestType) => {
  try {
    const response = await AuthenticatedAPI.post(
      API_ENDPOINTS.payment.withdraw,
      payload
    )

    return
  } catch (error) {
    throw error
  }
}
