import { useCallback } from 'react'
import { usePaystack } from 'react-native-paystack-webview'

import { handleErrorInstances } from '@/utils/error-handlers'
import { showToastMessage } from '@/components/notification'

import { PaystackPayload } from './hooks.types'

const usePaystackView = () => {
  const { popup } = usePaystack()

  const payNow = useCallback(
    ({
      email,
      amount,
      reference,
      currency,
      successCallback,
    }: PaystackPayload & {
      successCallback?: (reference: string) => void
    }) => {
      let isSuccessful = false

      popup.checkout({
        email,
        amount,
        reference: `TXN_${reference}`,
        onSuccess(data) {
          successCallback?.(reference)
        },
        onError(error) {
          showToastMessage(handleErrorInstances(error))
        },
        onCancel() {
          showToastMessage('Payment was cancelled', 'error')
        },
      })
    },
    [popup]
  )

  return { payNow }
}

export default usePaystackView
