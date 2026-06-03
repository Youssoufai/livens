export type RatingType = {
  rating: number
  user_id: string
}

export type AccountItemType = {
  id: string
  bank_name: string
  name: string
  account_number: string
  user_id: string
  recipient_code: string
}

export type AddAccountRequestType = {
  bank_name: string
  account_number: string
  bank_code: string
}

export type Bank = {
  active: boolean
  available_for_direct_debit: boolean
  code: string
  country: string
  createdAt: string
  currency: string
  gateway: string | null
  id: number
  is_deleted: boolean
  longcode: string
  name: string
  pay_with_bank: boolean
  slug: string
  supports_transfer: boolean
  type: string
  updatedAt: string
}
