import Constants from 'expo-constants'

export const envConfig = {
  googleSigninWebClientId: process.env.EXPO_PUBLIC_GOOGLE_SIGNIN_WEB_CLIENT_ID,
  googleSigninIosClientId: process.env.EXPO_PUBLIC_GOOGLE_SIGNIN_IOS_CLIENT_ID,
  googleMapApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
  paystackPubKey: process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY,
  imageBaseUrl: process.env.EXPO_PUBLIC_IMAGE_BASE_URL,
}
