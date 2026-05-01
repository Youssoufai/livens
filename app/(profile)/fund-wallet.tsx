import { router } from 'expo-router'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '@/components/form-field'
import ScreenHeader from '@/components/screen-header'
import Button from '@/components/ui/button'
import Text from '@/components/text'
import api from '@/lib/api'
import { fundWalletSchema, FundWalletFormValues } from '@/schemas/request'
import { ThemedView } from '@/components/themed-view'

export default function FundWalletScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FundWalletFormValues>({
    resolver: yupResolver(fundWalletSchema),
    defaultValues: { amount: undefined },
  })

  const onSubmit = async (values: FundWalletFormValues) => {
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
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.')
    }
  }

  return (
    <ThemedView>
      <ScreenHeader title="Fund wallet" />

      <Text size={22} weight={600} color="grey-800" style={styles.title}>
        Add funds to your wallet
      </Text>
      <Text size={14} color="grey-400" style={styles.subtitle}>
        Select a method to add external funds to your wallet. More options
        coming soon.
      </Text>

      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormField
            label="Enter amount"
            placeholder="0.00"
            keyboardType="numeric"
            onChangeText={(t) => onChange(Number(t))}
            onBlur={onBlur}
            value={value !== undefined ? String(value) : ''}
            error={errors.amount?.message}
          />
        )}
      />

      <View style={{ flex: 1 }} />

      <Button
        label="Fund wallet"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={isSubmitting}
        btnStyle={{ marginBottom: 10, borderRadius: 30 }}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { marginBottom: 8 },
  subtitle: { marginBottom: 30, lineHeight: 20 },
})
