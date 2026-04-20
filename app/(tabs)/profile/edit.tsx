import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '@/components/form-field'
import ScreenHeader from '@/components/screen-header'
import Button from '@/components/ui/button'
import Text from '@/components/text'
import api from '@/lib/api'
import { User } from '@/models/auth'

const IMAGE_BASE_URL = 'https://livelenns.online/public/images'

export default function EditProfile() {
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [originalPhotoPath, setOriginalPhotoPath] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ImagePicker.requestMediaLibraryPermissionsAsync()
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const { data } = await api.get<{ data: User }>('/profile')
      const photo = data.data.profile_photo
      setOriginalPhotoPath(photo)
      if (photo) setImageUri(`${IMAGE_BASE_URL}/${photo}`)
    } catch {
      // fail silently
    }
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })
      if (!result.canceled) {
        setImageUri(result.assets[0].uri)
      }
    } catch {
      // fail silently
    }
  }

  const handleSave = async () => {
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedPhone = phone.trim()
    const imageChanged =
      imageUri !== null && imageUri !== `${IMAGE_BASE_URL}/${originalPhotoPath}`

    if (!trimmedName && !trimmedEmail && !trimmedPhone && !imageChanged) {
      Alert.alert('Validation Error', 'Update at least one field.')
      return
    }

    setLoading(true)
    const success: string[] = []
    const errors: string[] = []

    try {
      if (imageChanged && imageUri) {
        const formData = new FormData()
        const fileName = imageUri.split('/').pop() || `photo-${Date.now()}.jpg`
        formData.append('photo', { uri: imageUri, name: fileName, type: 'image/jpeg' } as never)

        try {
          await api.post('/profile-photo', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          success.push('Profile photo updated')
        } catch {
          errors.push('Photo upload failed.')
        }
      }

      const updates = [
        trimmedName && { url: `/update-profile/name/${encodeURIComponent(trimmedName)}`, field: 'Name' },
        trimmedEmail && { url: `/update-profile/email/${encodeURIComponent(trimmedEmail)}`, field: 'Email' },
        trimmedPhone && { url: `/update-profile/phone/${encodeURIComponent(trimmedPhone)}`, field: 'Phone' },
      ].filter(Boolean) as { url: string; field: string }[]

      for (const update of updates) {
        try {
          await api.put(update.url)
          success.push(`${update.field} updated`)
        } catch {
          errors.push(`${update.field} update failed.`)
        }
      }

      if (success.length) {
        Alert.alert('Success', success.join('\n'))
        router.back()
      }
      if (errors.length) {
        Alert.alert('Error', errors.join('\n'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ScreenHeader title="Edit Profile" />

          <View style={styles.avatarSection}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.placeholder]}>
                <Ionicons name="person" size={40} color="#999" />
              </View>
            )}
            <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImage}>
              <Ionicons name="camera-outline" size={16} color="#FF3344" />
              <Text size={13} weight={600} color="danger" style={{ marginLeft: 5 }}>
                Change Photo
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <FormField
              label="Full Name"
              placeholder="Enter full name"
              value={name}
              onChangeText={setName}
            />
            <FormField
              label="Email Address"
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <FormField
              label="Phone Number"
              placeholder="Enter phone"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <Button
            label="Save"
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            btnStyle={styles.saveButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 100, height: 100, borderRadius: 100 },
  placeholder: { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  changePhotoBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  form: { marginBottom: 20 },
  saveButton: { borderRadius: 10, marginBottom: 40 },
})
