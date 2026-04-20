import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import Text from './text'

interface PasswordFieldProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label: string
  error?: string
}

export default function PasswordField({ label, error, style, ...inputProps }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <View style={styles.wrapper}>
      <Text size={14} weight={600} color="grey-800" style={styles.label}>
        {label}
      </Text>
      <View style={[styles.row, error ? styles.rowError : undefined]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!visible}
          {...inputProps}
        />
        <TouchableOpacity onPress={() => setVisible((v) => !v)} hitSlop={8}>
          <Ionicons name={visible ? 'eye-off-outline' : 'eye-outline'} size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
  },
  rowError: {
    borderColor: '#EF4444',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
  },
  error: {
    marginTop: 4,
  },
})
