import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import Text from './text'

interface FormFieldProps extends TextInputProps {
  label: string
  error?: string
}

export default function FormField({ label, error, style, ...inputProps }: FormFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text size={14} weight={600} color="grey-800" style={styles.label}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : undefined, style]}
        placeholderTextColor="#9CA3AF"
        {...inputProps}
      />
      {error ? (
        <Text size={12} color="danger" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#FAFAFA',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  error: {
    marginTop: 4,
  },
})
