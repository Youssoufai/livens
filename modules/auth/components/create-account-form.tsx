import { Alert, StyleSheet, View } from 'react-native'
import PhoneInput, {
  IPhoneInputRef,
  isValidPhoneNumber,
} from 'react-native-international-phone-number'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import parsePhoneNumberFromString from 'libphonenumber-js'

import Input from '@/components/ui/input'
import { RegisterFormValues, registerSchema } from '@/schemas/auth'
import { AuthResponse } from '@/models/auth'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { API } from '@/services'
import PasswordInput from '@/components/password-input'
import Text from '@/components/text'
import { phoneModalStyles, phoneStyles } from '@/styles/globalStyles'
import Button from '@/components/ui/button'
import { showToastMessage } from '@/components/notification'
import { catchErr, handleErrorInstances } from '@/utils/error-handlers'
import { COLORS } from '@/constants/theme'
import KeyboardScrollView from '@/components/keyboard-scrollview'
import AppStorage from '@/utils/storage'
import { STORE_KEYS } from '@/constants'

import { OnboardingStatus } from '../auth.types'

const CreateAccountForm = ({ onNext }: { onNext: (email: string) => void }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      referral: '',
    },
  })

  const [isPhoneValid, setIsPhoneValid] = useState(false)

  const phoneInputRef = useRef<IPhoneInputRef>(null)
  const storage = useRef(new AppStorage()).current

  const router = useRouter()

  const onSubmit = async (values: RegisterFormValues) => {
    const cleanedPhone = phoneInputRef.current?.fullPhoneNumber.replace(
      /\s/g,
      ''
    )

    const payload = {
      name: values.fullName.trim(),
      email: values.email.trim(),
      password: values.password,
      password_confirmation: values.password,
      phone: cleanedPhone,
    }

    try {
      const { data } = await API.post<AuthResponse>(
        API_ENDPOINTS.auth.register,
        payload
      )

      if (data?.access_token) {
        storage.setItem(STORE_KEYS.token, data.access_token)
      }

      storage.setItem(STORE_KEYS.onboarding, OnboardingStatus.in_progress)

      onNext(values.email)
    } catch (error: unknown) {
      showToastMessage(catchErr(error).message || '', 'error')
    }
  }

  const confirmPhoneValidity = () => {
    const value = phoneInputRef.current?.value || ''
    const phoneNumber = value.startsWith('+')
      ? parsePhoneNumberFromString(value)
      : parsePhoneNumberFromString(value, 'NG')

    setIsPhoneValid(!!phoneNumber?.isValid())
  }

  return (
    <KeyboardScrollView>
      <View style={styles.container}>
        <View style={styles.formWrapper}>
          <Input
            control={control}
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            error={errors.fullName?.message}
          />

          <Input
            control={control}
            name="email"
            label="Email"
            placeholder="john@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
          />

          <View style={styles.passwordWrapper}>
            <PasswordInput
              control={control}
              name="password"
              label="Password"
              placeholder="Create a password"
              addPadding={false}
              error={errors.password?.message}
            />

            <Text size={12} lineHeight={16} color="grey-400">
              Passwords must be a minimum of 8 characters, include one letter,
              and one number or symbol.
            </Text>
          </View>

          <PhoneInput
            ref={phoneInputRef}
            defaultCountry="NG"
            placeholder="Phone number"
            placeholderTextColor={COLORS.grey[300]}
            phoneInputStyles={phoneStyles}
            modalStyles={phoneModalStyles}
            visibleCountries={['NG']}
            onEndEditing={confirmPhoneValidity}
          />
        </View>
        <Button
          label="Create Account"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={!isValid || !isPhoneValid || isSubmitting}
          btnStyle={{ marginTop: 8 }}
        />
      </View>
    </KeyboardScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  formWrapper: {
    flex: 1,
    rowGap: 10,
  },
  passwordWrapper: {
    paddingBottom: 10,
    rowGap: 8,
  },
})

export default CreateAccountForm
