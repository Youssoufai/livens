import { router } from 'expo-router'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { useState } from 'react'

import Button from '@/components/ui/button'
import api from '@/lib/api'
import { fundWalletSchema, FundWalletFormValues } from '@/schemas/request'
import { ThemedView } from '@/components/themed-view'
import ProfileHeader from '@/modules/profile/components/profile-header'
import Input from '@/components/ui/input'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'

export default function FundWalletScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(fundWalletSchema),
    defaultValues: { amount: undefined },
  })

  const [reference, setReference] = useState('')

  const onSubmit: SubmitHandler<FundWalletFormValues> = async (values) => {
    try {
      const { data } = await api.post('/paystack-init', {
        amount: values.amount,
      })
      const authorizationUrl = data?.data?.authorization_url

      if (authorizationUrl) {
        router.push({
          pathname: '/profile/paymentWebview' as never,
          params: {
            url: authorizationUrl,
            onSuccessRedirect: '/(tabs)/profile',
          },
        })
      } else {
        Alert.alert('Error', 'No payment link returned')
      }
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Something went wrong',
        'error'
      )
    }
  }

  return (
    <ThemedView hasBottomPadding>
      <View style={styles.content}>
        <ProfileHeader
          title="Add funds to your wallet"
          description="Select a method to add external funds to your wallet. More options
        coming soon."
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
          loading={isSubmitting}
          disabled={isSubmitting || !isValid}
          btnStyle={{ marginBottom: 10, borderRadius: 30 }}
        />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginBottom: 8,
    rowGap: 32,
  },
  buttonWrapper: { marginBottom: 10, lineHeight: 20 },
})
