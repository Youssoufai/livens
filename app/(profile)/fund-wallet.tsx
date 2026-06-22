import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { useCallback, useRef, useState } from 'react'

import Button from '@/components/ui/button'
import { fundWalletSchema, FundWalletFormValues } from '@/schemas/request'
import { ThemedView } from '@/components/themed-view'
import ProfileHeader from '@/modules/profile/components/profile-header'
import Input from '@/components/ui/input'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { initiateFund, verifyPayment } from '@/services/payment'
import usePaystackView from '@/hooks/use-paystack'
import { useBoundStore } from '@/state'
import ScreenLoader from '@/components/screen-loader'

export default function FundWalletScreen() {
  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(fundWalletSchema),
    defaultValues: { amount: '' },
  })

  const queryParams = useLocalSearchParams<{
    prevScreen: 'create-request' | 'profile'
  }>()
  const router = useRouter()

  const [reference, setReference] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const hasVerifiedPayment = useRef(false)

  const userEmail = useBoundStore((state) => state.user?.email)
  const updateBalance = useBoundStore((state) => state.updateBalance)

  const { payNow } = usePaystackView()

  const completePayment = useCallback(
    async (paymentReference: string) => {
      setIsLoading(true)
      let errMsg = ''
      try {
        await verifyPayment(paymentReference)

        if (queryParams.prevScreen === 'create-request') {
          setIsRedirecting(true)
        }
        updateBalance(+getValues('amount'))
        setValue('amount', '')
      } catch (error) {
        errMsg =
          catchErr(error).message ??
          'Something went wrong while verifying your payment'
      } finally {
        setIsLoading(false)
        setReference('')
        showToastMessage(
          errMsg || 'Your wallet has been funded',
          errMsg.length ? 'error' : 'success'
        )
      }
    },
    [queryParams.prevScreen, updateBalance]
  )

  useFocusEffect(
    useCallback(() => {
      if (!reference || hasVerifiedPayment.current) return

      hasVerifiedPayment.current = true

      completePayment(reference)
    }, [reference, completePayment])
  )

  useFocusEffect(
    useCallback(() => {
      if (isRedirecting) {
        const timeoutId = setTimeout(() => {
          setIsRedirecting(false)
          if (queryParams.prevScreen) {
            router.replace({
              pathname: '/(requests)/create-request',
              params: { step: '4' },
            })
          } else {
            router.back()
          }
        }, 2500)

        return () => clearTimeout(timeoutId)
      }
    }, [isRedirecting, router, queryParams.prevScreen])
  )

  const handlePaymentSuccess = (reference: string) => {
    setReference(reference)
  }

  const onSubmit: SubmitHandler<FundWalletFormValues> = async (values) => {
    try {
      hasVerifiedPayment.current = false
      const data = await initiateFund(+values.amount)

      if (typeof data === 'string') {
        throw Error(
          data ||
            "Can't process payment at the moment. Please, try again later."
        )
      }

      if (userEmail) {
        payNow({
          email: userEmail || '',
          amount: +values.amount,
          reference: data.reference,
          successCallback: handlePaymentSuccess,
        })
      }
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Something went wrong while process payment',
        'error'
      )
    }
  }

  return (
    <>
      <ThemedView hasBottomPadding style={styles.container}>
        <View style={styles.content}>
          <ProfileHeader
            title="Add funds to your wallet"
            description="Select a method to add external funds to your wallet. More options coming soon."
          />

          <Input
            control={control}
            name="amount"
            label="Enter amount"
            placeholder="0.00"
            keyboardType="numeric"
            error={errors.amount?.message}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            label="Fund wallet"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting || isLoading}
          />
        </View>
      </ThemedView>
      <ScreenLoader isLoading={isRedirecting} content="Redirecting..." />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  content: {
    flex: 1,
    marginBottom: 8,
    rowGap: 32,
  },
  buttonWrapper: { marginBottom: 20, lineHeight: 20 },
})
