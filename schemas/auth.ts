import * as Yup from 'yup'

import yupPassword from 'yup-password'

yupPassword(Yup)

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export const registerSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .trim()
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .password()
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  referral: Yup.string().trim(),
})

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .trim()
    .required('Email is required'),
})

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .password()
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
})

export type LoginFormValues = Yup.InferType<typeof loginSchema>
export type RegisterFormValues = Yup.InferType<typeof registerSchema>
export type ForgotPasswordFormValues = Yup.InferType<
  typeof forgotPasswordSchema
>
export type ResetPasswordFormValues = Yup.InferType<typeof resetPasswordSchema>
