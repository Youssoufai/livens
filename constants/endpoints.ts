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
    edit: '/edit-request',
    fetch: '/get-requests',
    fetch_all: '/all-requests',
    details: (id: string) => `/get-request/${id}`,
    send_response: '/temp-response',
    get_responses: (id: string) => `/get-temp-responses/${id}`,
    get_response_status: (id: string) => `/get-response/${id}`,
    approve_reponse: '/response-approval',
    withdrawResponder: '/withdraw-responder',
    setAsPublic: (id: string) => `/make-public/${id}`,
    complete: '/complete-request',
    cancel: '/cancel-request',
  },
  response: {
    offer_list: (id: string) => `/offers-sent/${id}`,
    sent_offers: '/sent-offers',
    response_to_request: '/temp-response',
    submit_response: '/submit-response',
    edit_response: (requestId: string) => `/edit-response/${requestId}`,
  },
  search: {
    occassion: '/search-requests',
  },
  chat: {
    start: '/conversations',
    get_conversions: '/conversations',
    get_messages: (conversationId: string) =>
      `/conversations/${conversationId}/messages`,
    send_message: '/messages',
  },
  payment: {
    initiate: '/paystack-init',
    verify: '/verify-payment/',
    withdraw: '/initiate-withdrawal',
  },
  profile: {
    rating: '/rate-user',
    get_user: (id: string) => `get-user/${id}`,
  },
}
