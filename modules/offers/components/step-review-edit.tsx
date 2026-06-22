import { Lock, Video } from 'lucide-react-native'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image } from 'expo-image'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import ScrollView from '@/components/scrollview'
import { useEditResponseMutation } from '@/hooks/mutations/use-response'
import { catchErr } from '@/utils/error-handlers'
import { showToastMessage } from '@/components/notification'
import { REQUESTS_TABS } from '@/modules/request/requests.data'
import ScreenLoader from '@/components/screen-loader'

import { StepReviewProps } from '../offers.types'
import ResponseHeader from './response-header'

export default function StepReviewEdit({
  requestId,
  responseId,
  media,
  comment,
  disableEdit,
  onEditMedia,
  onEditComment,
}: StepReviewProps) {
  const router = useRouter()

  const [isRedirecting, setIsRedirecting] = useState(false)

  const { mutateAsync: editResponse, isPending } =
    useEditResponseMutation(requestId)

  useEffect(() => {
    if (isRedirecting) {
      const timeout = setTimeout(() => {
        setIsRedirecting(false)
        router.replace({
          pathname: '/(tabs)/requests',
          params: { tab: REQUESTS_TABS[1].value },
        })
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [isRedirecting])

  console.log(media)

  const handleUpdate = async () => {
    let errorMsg = ''

    try {
      await editResponse({ media, comment, response_id: responseId ?? '' })
      setIsRedirecting(true)
    } catch (error) {
      errorMsg = catchErr(error).message ?? 'Something went wrong'
    } finally {
      showToastMessage(
        errorMsg || 'Your response has been updated successfully.',
        errorMsg ? 'error' : 'success'
      )
    }
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <ResponseHeader
            title="Review your content"
            description="Please review your photos and comment before updating."
          />

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text size={14} lineHeight={18} weight={600} color="grey-700">
                Photos & Videos ({media.length})
              </Text>
              <Pressable
                onPress={onEditMedia}
                hitSlop={8}
                style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
              >
                <Text
                  size={13}
                  lineHeight={18}
                  weight={600}
                  color="primary-500"
                >
                  Edit
                </Text>
              </Pressable>
            </View>
            <View style={styles.mediaGrid}>
              {media.map((asset, i) => {
                const isVideo = asset.type.startsWith('video')

                if (isVideo) {
                  return (
                    <View
                      key={`edit_video_${i}`}
                      style={[styles.mediaThumb, styles.videoThumb]}
                    >
                      <Video size={24} color={COLORS.white} />
                    </View>
                  )
                }

                return (
                  <Image
                    key={`edit_photo_${i}`}
                    source={{ uri: 'uri' in asset ? asset.uri : asset.url }}
                    style={styles.mediaThumb}
                  />
                )
              })}
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text size={14} lineHeight={18} weight={600} color="grey-700">
                Your comment
              </Text>
              <TouchableOpacity onPress={onEditComment} hitSlop={8}>
                <Text
                  size={13}
                  lineHeight={18}
                  weight={600}
                  color="primary-500"
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.commentPreview}>
              <Text
                size={14}
                lineHeight={22}
                color={comment ? 'grey-600' : 'grey-300'}
              >
                {comment || 'No comment added.'}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            label="Update response"
            onPress={handleUpdate}
            loading={isPending}
            disabled={disableEdit}
          />
          <View style={styles.securityRow}>
            <Lock size={13} color={COLORS.grey[300]} />
            <Text size={12} lineHeight={16} color="grey-300">
              Your content is secure and only visible to the requester.
            </Text>
          </View>
        </View>
      </View>
      <ScreenLoader isLoading={isRedirecting} content="Redirecting..." />
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingBottom: 24,
    paddingHorizontal: 16,
    rowGap: 20,
  },
  section: { rowGap: 12 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  mediaThumb: {
    width: '25%',
    height: 90,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: COLORS.grey[50],
  },
  videoThumb: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grey[200],
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.grey[50],
  },
  commentPreview: {
    borderWidth: 1,
    borderColor: COLORS.grey[50],
    borderRadius: 12,
    padding: 14,
    minHeight: 80,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.grey[50],
    backgroundColor: COLORS.white,
    rowGap: 12,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 5,
  },
})
