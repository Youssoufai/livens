import * as Yup from 'yup'

export const createRequestSchema = Yup.object({
  title: Yup.string().trim().min(3, 'Location must be at least 3 characters').required('Location is required'),
  description: Yup.string().trim().min(10, 'Description must be at least 10 characters').required('Description is required'),
})

export const requestConditionSchema = Yup.object({
  duration: Yup.string().required('Please select a duration'),
})

export const rewardSchema = Yup.object({
  selectedReward: Yup.string().nullable(),
  customAmount: Yup.string().when('selectedReward', {
    is: 'custom',
    then: (schema) =>
      schema
        .required('Custom amount is required')
        .test('min', 'Minimum custom reward is ₦500', (val) => Number(val) >= 500),
    otherwise: (schema) => schema.optional(),
  }),
  noReward: Yup.boolean(),
})

export const locationSchema = Yup.object({
  location: Yup.string().trim().min(3, 'Location is too short').required('Location is required'),
})

export const fundWalletSchema = Yup.object({
  amount: Yup.number()
    .positive('Amount must be greater than 0')
    .min(100, 'Minimum amount is ₦100')
    .required('Amount is required'),
})

export type CreateRequestFormValues = Yup.InferType<typeof createRequestSchema>
export type RequestConditionFormValues = Yup.InferType<typeof requestConditionSchema>
export type LocationFormValues = Yup.InferType<typeof locationSchema>
export type FundWalletFormValues = Yup.InferType<typeof fundWalletSchema>
