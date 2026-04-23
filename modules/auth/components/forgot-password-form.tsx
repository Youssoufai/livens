import { StyleSheet, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Input from '@/components/ui/input'
import Button from '@/components/ui/button'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { API } from '@/services'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { ForgotPasswordFormValues, forgotPasswordSchema } from '@/schemas/auth'

const ForgotPasswordForm = ({
  onNext,
}: {
  onNext: (email: string) => void
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await API.post(API_ENDPOINTS.auth.forgot_password, {
        email: values.email.trim(),
      })
      onNext(values.email.trim())
    } catch (error) {
      showToastMessage(catchErr(error).message || 'Something went wrong', 'error')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Input
          control={control}
          name="email"
          label="Email address"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email?.message}
        />
      </View>
      <Button
        label="Send reset code"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  main: {
    flex: 1,
  },
})

export default ForgotPasswordForm
