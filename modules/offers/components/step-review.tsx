import { Lock, Video } from 'lucide-react-native'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image } from 'expo-image'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import ScrollView from '@/components/scrollview'
import { useSubmitResponseMutation } from '@/hooks/mutations/use-response'
import { catchErr } from '@/utils/error-handlers'
import { showToastMessage } from '@/components/notification'
import { REQUESTS_TABS } from '@/modules/request/requests.data'
import ScreenLoader from '@/components/screen-loader'
import { MediaType } from '@/services/requests/request.types'
import MediaDisplay from '@/components/media-display'

import { StepReviewProps } from '../offers.types'
import ResponseHeader from './response-header'

export default function StepReview({
  requestId,
  media,
  comment,
  onEditMedia,
  onEditComment,
}: StepReviewProps) {
  const router = useRouter()

  const [selectedMedia, setSelectedMedia] = useState<MediaType | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const { mutateAsync: submitResponse, isPending } = useSubmitResponseMutation()

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

  const handleSubmit = async () => {
    let errorMsg = ''

    try {
      await submitResponse({ media, comment, request_id: requestId })
      setIsRedirecting(true)
    } catch (error) {
      errorMsg = catchErr(error).message ?? 'Something went wrong'
    } finally {
      showToastMessage(
        errorMsg ||
          'Your content has been submitted and the reward will be on it’s way to you once the requestor approves of it.',
        errorMsg ? 'error' : 'success'
      )
    }
  }

  const dismissModal = () => {
    setSelectedMedia(null)
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <ResponseHeader
            title="Review your content"
            description="Please review your photos and comment before submitting."
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
                const isVideo =
                  asset.name.includes('mp4') || asset.uri.includes('mp4')

                if (isVideo) {
                  return (
                    <Pressable
                      key={`captured_video_uri_${i}`}
                      style={[styles.mediaThumb, styles.videoThumb]}
                      onPress={() =>
                        setSelectedMedia({
                          public_id: '',
                          url: asset.uri,
                          type: 'video',
                        })
                      }
                    >
                      <Video size={24} color={COLORS.white} />
                    </Pressable>
                  )
                }

                return (
                  <Pressable
                    key={`captured_photo_uri_${i}`}
                    onPress={() =>
                      setSelectedMedia({
                        public_id: '',
                        url: asset.uri,
                        type: 'jpeg',
                      })
                    }
                  >
                    <Image
                      source={{ uri: asset.uri }}
                      style={styles.mediaThumb}
                    />
                  </Pressable>
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
          <Button label="Submit" onPress={handleSubmit} loading={isPending} />
          <View style={styles.securityRow}>
            <Lock size={13} color={COLORS.grey[300]} />
            <Text size={12} lineHeight={16} color="grey-300">
              Your content is secure and only visible to the requester.
            </Text>
          </View>
        </View>
      </View>
      <MediaDisplay
        selectedMedia={selectedMedia}
        canSaveMedia={false}
        onDismiss={dismissModal}
      />
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
