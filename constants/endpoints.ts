export const API_ENDPOINTS = {
  auth: {
    register: '/register',
    login: '/login',
    verify_email: '/verify-email',
    location: '/update-location',
    profile: '/profile',
    google_signin: '/auth/google',
    forgot_password: '/passwordreset-mail',
    confirm_otp: '/otp-confirmation',
    reset_password: '/reset-password',
  },
  requests: {
    create: '/create-request',
    fetch: '/get-requests',
    fetch_all: '/all-requests',
    details: (id: string) => `/get-request/${id}`,
    send_response: '/temp-response',
    get_response: (id: string) => `/get-temp-responses/${id}`,
    approve_reponse: '/response-approval',
    complete: '/complete-request',
    cancel: '/cancel-request',
  },
  search: {
    occassion: '/search-requests',
  },
}
