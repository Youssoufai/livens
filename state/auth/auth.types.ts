export interface AuthState {
  isAuthenticated: boolean
  biometricTriedThisSession: boolean
  user?: User
  error?: string
  loading: boolean
  getUser: () => Promise<void>
  logout: VoidFunction
}

export type BusinessFormDetailsState = {
  logo?: FileType
  businessName?: string
  businessEmail?: string
  phone?: string
  type?: string
  address?: string
  city?: string
  state?: string
  localGovernment?: string
}

export type FormAction<T> = {
  clearFields: VoidFunction
  updateFields: (fields: T) => void
}

export type AccountCreationState = {
  firstName?: string
  lastName?: string
  region?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export interface SignupPayload {
  first_name: string
  last_name: string
  region: string
  email: string
  password: string
  password_confirmation: string
}
