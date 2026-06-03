import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin'
import { AxiosError } from 'axios'

import { showToastMessage } from '@/components/notification'
import { catchErr, handleErrorInstances } from '@/utils/error-handlers'
import { API } from '@/services'

import { GoogleAPIResponseType } from './hooks.types'

export function useGoogleSignIn() {
  const loginWithGoogle = async (apiEndpoint: string) => {
    if (!apiEndpoint) return

    try {
      await GoogleSignin.hasPlayServices()
      await GoogleSignin.signOut()
      const response = await GoogleSignin.signIn()

      if (!isSuccessResponse(response)) {
        throw Error('Unable to signin with Google')
      }

      if (!response.data.idToken) {
        throw Error('Unable to signin with Google. Try again later')
      }

      const apiResponse = await API.post<GoogleAPIResponseType>(apiEndpoint, {
        id_token: response.data.idToken,
      })

      return apiResponse.data
    } catch (error) {
      let errorMsg = ''
      if (error instanceof AxiosError) {
        errorMsg = catchErr(error).message ?? 'Something went wrong'
      } else if (isErrorWithCode(error)) {
        console.log(error)

        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            errorMsg = 'operation (eg. sign in) already in progress'
            break
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            errorMsg = 'Android only, play services not available or outdated'
            break
          default:
            errorMsg = 'some other error happened'
        }
      } else {
        errorMsg = handleErrorInstances(error)
      }
      showToastMessage(errorMsg, 'error')
    }
  }

  return { loginWithGoogle }
}
