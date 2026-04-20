import { Ionicons } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { router } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '@/components/form-field'
import ScreenHeader from '@/components/screen-header'
import Button from '@/components/ui/button'
import Text from '@/components/text'
import { useRequest } from '@/context/requestContext'
import { createRequestSchema, CreateRequestFormValues } from '@/schemas/request'

export default function CreateRequest() {
  const { updateRequest } = useRequest()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRequestFormValues>({
    resolver: yupResolver(createRequestSchema),
    defaultValues: { title: '', description: '' },
  })

  const onSubmit = (values: CreateRequestFormValues) => {
    updateRequest({ location: values.title, description: values.description })
    router.push('/requests/requestCondition' as never)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader />

      <Text size={13} color="grey-400" style={styles.stepText}>
        Step 1 of 4
      </Text>
      <Text size={22} weight={700} color="grey-800" style={styles.title}>
        Create request
      </Text>

      <Text size={14} color="grey-400" style={styles.label}>
        Specify the location where you need updates from.
      </Text>

      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={18} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Choose location"
              placeholderTextColor="#999"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {errors.title ? (
              <Text size={12} color="danger">
                {errors.title.message}
              </Text>
            ) : null}
          </View>
        )}
      />

      <Text size={14} color="grey-400" style={[styles.label, { marginTop: 20 }]}>
        Describe what respondents should focus on when capturing content for you.
      </Text>

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              style={styles.textArea}
              placeholder="E.g: Take a picture of the pool"
              placeholderTextColor="#999"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
            />
            {errors.description ? (
              <Text size={12} color="danger" style={{ marginTop: -8, marginBottom: 8 }}>
                {errors.description.message}
              </Text>
            ) : null}
          </>
        )}
      />

      <View style={{ flex: 1 }} />
      <Button label="Next" onPress={handleSubmit(onSubmit)} btnStyle={{ marginBottom: 20 }} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, backgroundColor: '#fff' },
  stepText: { marginTop: 16 },
  title: { marginTop: 4, marginBottom: 20 },
  label: { marginBottom: 8, lineHeight: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 15, color: '#111' },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: '#111',
    minHeight: 120,
    textAlignVertical: 'top',
    backgroundColor: '#FAFAFA',
  },
})
