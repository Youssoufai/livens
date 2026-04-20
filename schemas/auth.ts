import * as Yup from 'yup'

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

export const registerSchema = Yup.object({
  fullName: Yup.string().trim().min(2, 'Name must be at least 2 characters').required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  phone: Yup.string()
    .matches(/^[0-9]{10,11}$/, 'Enter a valid Nigerian phone number (10-11 digits)')
    .required('Phone number is required'),
})

export type LoginFormValues = Yup.InferType<typeof loginSchema>
export type RegisterFormValues = Yup.InferType<typeof registerSchema>
