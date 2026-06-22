import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { useRef, useState } from 'react'
import PhoneInput, {
  IPhoneInputRef,
} from 'react-native-international-phone-number'
import parsePhoneNumberFromString from 'libphonenumber-js'

import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { ThemedView } from '@/components/themed-view'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { useBoundStore } from '@/state'
import { AuthenticatedAPI } from '@/services'
import { API_ENDPOINTS } from '@/constants/endpoints'
import { editProfileSchema, EditProfileFormValues } from '@/schemas/profile'
import ProfilePhoto from '@/modules/profile/components/profile-photo'
import { envConfig } from '@/utils/config'
import { phoneModalStyles, phoneStyles } from '@/styles/globalStyles'
import { COLORS } from '@/constants/theme'
import Text from '@/components/text'

export default function EditProfileScreen() {
  const [photo, setPhoto] = useState<FileType | null>()
  const [isPhoneValid, setIsPhoneValid] = useState(false)

  const phoneInputRef = useRef<IPhoneInputRef>(null)

  const user = useBoundStore((state) => state.user)
  const getUser = useBoundStore((state) => state.getUser)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<EditProfileFormValues>({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
    },
  })

  const confirmPhoneValidity = () => {
    const value = phoneInputRef.current?.value || ''
    const phoneNumber = value.startsWith('+')
      ? parsePhoneNumberFromString(value)
      : parsePhoneNumberFromString(value, 'NG')

    setIsPhoneValid(!!phoneNumber?.isValid())
  }

  const cleanedPhone = phoneInputRef.current?.fullPhoneNumber.replace(/\s/g, '')

  const onSubmit: SubmitHandler<EditProfileFormValues> = async (values) => {
    try {
      const formdata = new FormData()

      if (values.name && values.name !== user?.name) {
        formdata.append('name', values.name)
      }

      if (cleanedPhone && cleanedPhone !== user?.phone) {
        formdata.append('phone', cleanedPhone ?? '')
      }

      if (photo) {
        formdata.append('photo', photo as any)
      }

      await AuthenticatedAPI.put(API_ENDPOINTS.profile.edit, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      await getUser()
      showToastMessage('Profile updated successfully', 'success')
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Failed to update profile',
        'error'
      )
    }
  }

  const profileImage =
    photo?.uri ??
    (user?.profile_photo
      ? envConfig.imageBaseUrl + user?.profile_photo
      : undefined)

  return (
    <ThemedView hasBottomPadding style={styles.container}>
      <View style={styles.content}>
        <ProfilePhoto image={profileImage} setImage={setPhoto} />
        <View style={styles.form}>
          <Input
            control={control}
            name="name"
            label="Full name"
            placeholder="Johnathan Benjamin"
            error={errors.name?.message}
          />
          <Input
            control={control}
            name="email"
            label="Email address"
            placeholder="johnathanb@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            disabled
            editable={false}
            error={errors.email?.message}
          />
          <View style={styles.phoneInputWrapper}>
            <Text size={14} lineHeight={20} weight={600} color="grey-500">
              Phone number
            </Text>
            <PhoneInput
              ref={phoneInputRef}
              defaultCountry="NG"
              placeholder="Phone number"
              defaultValue={user?.phone}
              placeholderTextColor={COLORS.grey[300]}
              phoneInputStyles={phoneStyles}
              modalStyles={phoneModalStyles}
              visibleCountries={['NG']}
              onEndEditing={confirmPhoneValidity}
            />
          </View>
        </View>
      </View>
      <Button
        label="Save"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={(!isDirty && !photo && !isPhoneValid) || !isValid}
        btnStyle={styles.button}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
  content: {
    flex: 1,
    rowGap: 32,
    marginBottom: 8,
  },
  form: {
    rowGap: 4,
  },
  button: {
    marginBottom: 20,
  },
  phoneInputWrapper: {
    rowGap: 8,
  },
})
