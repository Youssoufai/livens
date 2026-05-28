import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'
import { useState } from 'react'

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

export default function EditProfileScreen() {
  const [photo, setPhoto] = useState<FileType | null>()

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
      phone: user?.phone ?? '',
    },
  })

  const onSubmit: SubmitHandler<EditProfileFormValues> = async (values) => {
    try {
      await AuthenticatedAPI.put(API_ENDPOINTS.profile.edit, {
        name: values.name,
        email: values.email,
        phone: values.phone,
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
          <Input
            control={control}
            name="phone"
            label="Phone number"
            placeholder="08012345678"
            keyboardType="phone-pad"
            error={errors.phone?.message}
          />
        </View>
      </View>
      <Button
        label="Save"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={!isDirty || !isValid || !photo}
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
})
