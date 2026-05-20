import AsyncStorage from '@react-native-async-storage/async-storage'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, router } from 'expo-router'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import { AuthResponse } from '@/models/auth'
import { loginSchema, LoginFormValues } from '@/schemas/auth'
import { initDeviceToken } from '@/utils/deviceToken'
import { saveToken } from '@/utils/secureStore'
import PasswordInput from '@/components/password-input'
import AppStorage from '@/utils/storage'
import { STORE_KEYS } from '@/constants'
import { OnboardingStatus } from '@/modules/auth/auth.types'
import { useBoundStore } from '@/state'
import { useGoogleSignIn } from '@/hooks/use-google-signin'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { COLORS } from '@/constants/theme'
import GoogleLogo from '@/assets/icons/logos_google.svg'
import Input from '@/components/ui/input'
import { ThemedView } from '@/components/themed-view'
import AppLogo from '@/assets/icons/in-app-logo.svg'
import Checkbox from '@/components/check-box'
import { actuateFontSize, actuateLineHeight } from '@/utils/normalize'
import { FONTS } from '@/constants/fonts'
import { API } from '@/services'
import { showToastMessage } from '@/components/notification'
import { catchErr, handleErrorInstances } from '@/utils/error-handlers'

export default function LoginScreen() {
  const insets = useSafeAreaInsets()
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)
  const [rememberMeChecked, setRememberMeChecked] = useState(false)

  const getUser = useBoundStore((state) => state.getUser)

  const { loginWithGoogle } = useGoogleSignIn()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const storage = useRef(new AppStorage()).current

  const completeSignin = async (token: string, hasLocation: boolean) => {
    try {
      storage.setItem(STORE_KEYS.token, token)
      storage.setItem(STORE_KEYS.onboarding, OnboardingStatus.completed)

      if (!hasLocation) {
        router.replace({
          pathname: '/(auth)/create-account',
          params: { step: '3' },
        })
        return
      }

      await getUser()

      router.replace('/(tabs)/home')
    } catch (error) {
      console.error(handleErrorInstances(error))
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoadingGoogle(true)
      const response = await loginWithGoogle(API_ENDPOINTS.auth.google_signin)

      if (!response?.token) return

      completeSignin(response.token, !!response?.user?.location)
    } catch (error) {
    } finally {
      setIsLoadingGoogle(false)
    }
  }

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { data } = await API.post<AuthResponse>(API_ENDPOINTS.auth.login, {
        email: values.email.trim(),
        password: values.password,
      })

      const authToken = data?.access_token
      if (!authToken) throw new Error('Authentication token missing')

      completeSignin(authToken, !!data?.user?.location)
    } catch (error) {
      showToastMessage(catchErr(error).message ?? '', 'error')
    }
  }

  return (
    <ThemedView hasBottomPadding>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppLogo />
          <Text
            size={28}
            weight={700}
            color="black"
            align="center"
            style={styles.title}
          >
            Welcome back
          </Text>
        </View>

        <View style={styles.formField}>
          <Input
            control={control}
            name="email"
            label="Email address"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
          />

          <PasswordInput
            control={control}
            name="password"
            label="Password"
            placeholder="Enter password"
            error={errors.password?.message}
            addPadding={false}
          />
          <View style={styles.supplementaryContent}>
            <Checkbox
              label="Remember me"
              checked={rememberMeChecked}
              onPress={() =>
                setRememberMeChecked((prevChecked) => !prevChecked)
              }
            />
            <Link
              href="/(auth)/forgot-password"
              style={styles.forgotPasswordLink}
            >
              Forgot password?
            </Link>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            label="Log in"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
          />
          <Button
            label="Continue with Google"
            icon={<GoogleLogo />}
            alignIcon="left"
            labelColor="black"
            loading={isLoadingGoogle}
            btnStyle={styles.socialButton}
            onPress={handleGoogleLogin}
          />
        </View>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 6,
  },
  header: {
    rowGap: 32,
    alignItems: 'center',
  },
  title: {
    marginBottom: 28,
  },
  formField: {
    flex: 1,
  },
  socialButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#CDCDCD',
  },
  forgotPasswordLink: {
    fontSize: actuateFontSize(14),
    lineHeight: actuateLineHeight(14, 18),
    color: COLORS.black,
    fontFamily: FONTS.dm_sans[600],
  },
  buttonWrapper: {
    rowGap: 16,
    paddingBottom: 16,
  },
  supplementaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
})
