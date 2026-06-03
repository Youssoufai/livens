export type InitiatePaymentResponse = {
  authorization_url: string
  reference: string
  message?: string
}

export type WithdrawalRequestType = {
  amount: number
  recipient_code: string
}
