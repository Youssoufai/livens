import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import api from '@/lib/api'
import { getCurrentRequestId, clearCurrentRequestId } from '@/utils/requestStorage'

export default function SubmitContentScreen() {
  const params = useLocalSearchParams<{ media?: string; comment?: string }>()
  const media: string[] = params.media ? JSON.parse(params.media) : []
  const comment = params.comment || ''

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    const requestId = await getCurrentRequestId('CURRENT_REQUEST_ID')

    if (!requestId) {
      Alert.alert('Error', 'Missing request id. Please restart the request flow.')
      return
    }
    if (!media.length && !comment) {
      Alert.alert('Error', 'Please add images or a comment before submitting.')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      media.forEach((uri, index) => {
        if (!uri || typeof uri !== 'string') return
        const fileUri = uri.startsWith('file://') ? uri : `file://${uri}`
        formData.append('media[]', { uri: fileUri, name: `photo_${index}.jpg`, type: 'image/jpeg' } as never)
      })
      formData.append('comment', String(comment))
      formData.append('request_id', requestId.toString())

      await api.post('/submit-response', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      await clearCurrentRequestId()
      Alert.alert('Success', 'Response submitted!')
      router.push({
        pathname: '/requests/confirmation' as never,
        params: { media: JSON.stringify(media), comment },
      })
    } catch {
      Alert.alert('Network Error', 'Please check your internet or try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text size={12} color="grey-400">
          Step 3 of 3
        </Text>
        <Text size={22} weight={700} color="grey-800" style={{ marginTop: 4 }}>
          Submit content
        </Text>

        {media.length > 0 && (
          <View style={styles.mediaGrid}>
            {media.map((uri, i) => (
              <Image key={i} source={{ uri }} style={styles.mediaImage} />
            ))}
          </View>
        )}

        <TouchableOpacity
          onPress={() =>
            router.push({ pathname: '/submit/capture' as never, params: { media: JSON.stringify(media) } })
          }>
          <Text size={14} color="primary-300" style={{ marginTop: 8 }}>
            Edit photos
          </Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <Text size={16} weight={700} color="grey-800">
            Comment
          </Text>
          <Text size={14} color="grey-400" style={{ marginTop: 4 }}>
            {comment || 'No comment provided'}
          </Text>
        </View>
      </ScrollView>

      <View style={{ padding: 20 }}>
        <Button label="Submit content" onPress={onSubmit} loading={loading} disabled={loading} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mediaGrid: { marginTop: 20, flexDirection: 'row', flexWrap: 'wrap' },
  mediaImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
})
