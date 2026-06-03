import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'

import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Text from '@/components/text'
import { ThemedView } from '@/components/themed-view'
import { showToastMessage } from '@/components/notification'
import { catchErr } from '@/utils/error-handlers'
import { AuthenticatedAPI } from '@/services'
import { contactSchema, ContactFormValues } from '@/schemas/profile'

export default function ContactScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactFormValues>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    try {
      await AuthenticatedAPI.post('/support/message', {
        title: values.title,
        description: values.description,
      })
      reset()
      showToastMessage('Message sent successfully', 'success')
    } catch (error) {
      showToastMessage(
        catchErr(error).message ?? 'Failed to send message',
        'error'
      )
    }
  }

  return (
    <ThemedView hasBottomPadding style={styles.container}>
      <View style={styles.content}>
        <Text size={22} lineHeight={30} weight={700} color="grey-800">
          Send us a message and we'll respond at our earliest convenience.
        </Text>

        <View style={styles.form}>
          <Input
            control={control}
            name="title"
            label="Title"
            placeholder="Ex. I want to change my phone number"
            error={errors.title?.message}
          />
          <Input
            control={control}
            name="description"
            label="Describe your problem"
            placeholder="Ex. I don't know how to do it"
            multiline
            numberOfLines={5}
            style={styles.textarea}
            error={errors.description?.message}
          />
        </View>
      </View>

      <Button
        label="Send"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={!isValid}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  content: {
    flex: 1,
    rowGap: 28,
    marginBottom: 8,
  },
  form: {
    rowGap: 4,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
})
