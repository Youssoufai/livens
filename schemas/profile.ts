import * as Yup from 'yup'

export const editProfileSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .trim()
    .min(10, 'Phone number is too short')
    .required('Phone number is required'),
})

export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    .required('Please confirm your new password'),
})

export const addBankSchema = Yup.object({
  bank: Yup.string().required('A bank is required'),
  accountNumber: Yup.string().required('Account number is required'),
  accountName: Yup.string().required('An account name is required'),
})

export const deleteAccountSchema = Yup.object({
  confirmation: Yup.string()
    .oneOf(['Delete my account'], 'Please type "Delete my account" exactly')
    .required('Confirmation is required'),
})

export const contactSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  description: Yup.string()
    .trim()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
})

export type EditProfileFormValues = Yup.InferType<typeof editProfileSchema>
export type ChangePasswordFormValues = Yup.InferType<
  typeof changePasswordSchema
>
export type AddBankSchemaType = Yup.InferType<typeof addBankSchema>
export type DeleteAccountFormValues = Yup.InferType<typeof deleteAccountSchema>
export type ContactFormValues = Yup.InferType<typeof contactSchema>
