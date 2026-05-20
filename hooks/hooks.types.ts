export type PaystackPayload = {
  email: string
  amount: number
  reference: string
  currency?: string
}

export type GoogleAPIResponseType = {
  token: string
  user: User
}
