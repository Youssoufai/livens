import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '@/components/ui/button'
import ScreenHeader from '@/components/screen-header'
import Text from '@/components/text'
import { useRequest } from '@/context/requestContext'

const DURATIONS = ['6 hours', '12 hours', '18 hours', '24 hours']

export default function RequestConditions() {
  const router = useRouter()
  const { updateRequest } = useRequest()

  const [duration, setDuration] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const handleNext = () => {
    if (!duration) {
      Alert.alert('Select duration', 'Please select a duration before proceeding.')
      return
    }
    updateRequest({ duration, allow_comment: '0' })
    router.push('/requests/reward' as never)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScreenHeader />

          <Text size={13} color="grey-400" style={styles.stepText}>
            Step 2 of 4
          </Text>
          <Text size={24} weight={700} color="grey-800" style={styles.title}>
            Set request conditions
          </Text>
          <Text size={14} color="grey-500" style={styles.subtitle}>
            Choose a time duration for which the request must be completed.
          </Text>

          <TouchableOpacity
            onPress={() => setShowDropdown(true)}
            style={styles.dropdown}>
            <Text size={15} color={duration ? 'grey-800' : 'grey-400'}>
              {duration || 'Select duration'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#777" />
          </TouchableOpacity>

          <View style={{ flex: 1 }} />

          <Button
            label="Next"
            onPress={handleNext}
            disabled={!duration}
            btnStyle={{ marginBottom: 20 }}
          />
        </View>

        <Modal visible={showDropdown} transparent animationType="fade">
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setShowDropdown(false)}
            activeOpacity={1}>
            <View style={styles.dropdownMenu}>
              {DURATIONS.map((item, index) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    setDuration(item)
                    setShowDropdown(false)
                  }}
                  style={[
                    styles.dropdownItem,
                    index !== DURATIONS.length - 1 && styles.dropdownItemBorder,
                  ]}>
                  <Text size={16} color="grey-800">
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  stepText: { marginTop: 16 },
  title: { marginTop: 4, marginBottom: 8 },
  subtitle: { lineHeight: 20, marginBottom: 16 },
  dropdown: {
    marginTop: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  dropdownMenu: { backgroundColor: '#FFF', borderRadius: 12, paddingVertical: 10 },
  dropdownItem: { paddingVertical: 14, paddingHorizontal: 16 },
  dropdownItemBorder: { borderBottomWidth: 1, borderColor: '#EEE' },
})
