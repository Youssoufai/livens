import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useMemo, useState } from 'react'
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Text from '@/components/text'
import Button from '@/components/ui/button'
import api from '@/lib/api'
import { COLORS } from '@/constants/theme'
import { getCurrentRequestId } from '@/utils/requestStorage'

const MAX_COMMENT = 500
const MAX_PHOTOS = 6

export default function ReviewAndComment() {
  const params = useLocalSearchParams()

  const initialMedia = useMemo(() => {
    try {
      return params.media ? JSON.parse(params.media) : []
    } catch {
      return []
    }
  }, [params.media])

  const request_id = params.request_id

  const [media, setMedia] = useState(initialMedia)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const canSubmit = media.length > 0 || comment.trim().length > 0

  const removePhoto = (index) => {
    setMedia((prev) => prev.filter((_, i) => i !== index))
  }

  const addMorePhotos = () => {
    // Re-open camera by going back to captureContent, preserving current photos
    router.push({
      pathname: '/requests/captureContent',
      params: { request_id: String(request_id), existing_media: JSON.stringify(media) },
    })
  }

  const handleSubmit = async () => {
    if (!canSubmit) return

    let resolvedRequestId = request_id
    if (!resolvedRequestId) {
      resolvedRequestId = await getCurrentRequestId('CURRENT_REQUEST_ID')
    }

    if (!resolvedRequestId) {
      Alert.alert('Error', 'Missing request ID. Please restart the flow.')
      return
    }

    setSubmitting(true)
    try {
      const formData = new FormData()
      media.forEach((uri, index) => {
        const fileUri = uri.startsWith('file://') ? uri : `file://${uri}`
        formData.append('media[]', {
          uri: fileUri,
          name: `photo_${index}.jpg`,
          type: 'image/jpeg',
        })
      })
      formData.append('comment', comment)
      formData.append('request_id', String(resolvedRequestId))

      await api.post('/submit-response', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      router.replace({
        pathname: '/requests/submission-success',
        params: { request_id: String(resolvedRequestId) },
      })
    } catch {
      Alert.alert('Error', 'Could not submit. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={COLORS.grey[800]} />
          </TouchableOpacity>
          <Text size={12} color="grey-300">
            Step 3 of 4
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text size={24} lineHeight={30} weight={700} color="grey-800">
            Review & Comment
          </Text>

          {/* Photo grid */}
          <View style={styles.section}>
            <Text size={14} lineHeight={18} weight={600} color="grey-600">
              Your photos
            </Text>
            <View style={styles.photoGrid}>
              {media.map((uri, i) => (
                <View key={i} style={styles.photoCell}>
                  <Image source={{ uri }} style={styles.photo} />
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removePhoto(i)}
                    hitSlop={4}
                  >
                    <Ionicons name="close" size={12} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}

              {media.length < MAX_PHOTOS ? (
                <TouchableOpacity style={styles.addMoreCell} onPress={addMorePhotos}>
                  <Ionicons name="add" size={24} color={COLORS.grey[300]} />
                  <Text size={11} lineHeight={14} color="grey-300" align="center">
                    Add more
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {/* Comment */}
          <View style={styles.section}>
            <Text size={14} lineHeight={18} weight={600} color="grey-600">
              Comment{' '}
              <Text size={14} color="grey-300">
                (optional)
              </Text>
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Share your thoughts on this place…"
                placeholderTextColor={COLORS.grey[100]}
                value={comment}
                onChangeText={(t) => setComment(t.slice(0, MAX_COMMENT))}
                multiline
                textAlignVertical="top"
              />
              <Text size={11} color="grey-300" align="right" style={styles.charCount}>
                {comment.length}/{MAX_COMMENT}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer CTA */}
        <View style={styles.footer}>
          <Button
            label="Continue"
            onPress={handleSubmit}
            loading={submitting}
            disabled={!canSubmit || submitting}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: { padding: 4 },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    rowGap: 24,
  },
  section: { rowGap: 12 },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  photoCell: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'visible',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.grey[50],
  },
  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  addMoreCell: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.grey[50],
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 4,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: COLORS.grey[50],
    borderRadius: 12,
    padding: 14,
    rowGap: 8,
    minHeight: 120,
  },
  textInput: {
    fontSize: 14,
    color: COLORS.grey[700],
    flex: 1,
    minHeight: 80,
  },
  charCount: { marginTop: 4 },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.grey[50],
    backgroundColor: COLORS.white,
  },
})
