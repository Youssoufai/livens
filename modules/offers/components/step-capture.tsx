import { useState } from 'react'
import {
  CheckCircle,
  Camera as CameraIcon,
  Video,
  XIcon,
} from 'lucide-react-native'
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native'

import Button from '@/components/ui/button'
import Text from '@/components/text'
import { COLORS } from '@/constants/theme'
import ScrollView from '@/components/scrollview'

import CameraModal from './camera-modal'
import ResponseHeader from './response-header'
import { StepCaptureProps } from '../offers.types'

const MAX_PHOTOS = 4
const MAX_VIDEOS = 1

export default function StepCapture({
  descriptionItems,
  media,
  onMediaChange,
  onNext,
}: StepCaptureProps) {
  const [cameraOpen, setCameraOpen] = useState(false)

  const photos = media.filter((m) => m.type.startsWith('image/'))
  const video = media.find((m) => m.type.startsWith('video/')) ?? null

  const canAddPhoto = photos.length < MAX_PHOTOS
  const canAddVideo = !video

  const addPhoto = (photo: FileType) => {
    onMediaChange([...media, photo])
  }

  const addVideo = (v: FileType) => {
    onMediaChange([...media.filter((m) => m.type.startsWith('image/')), v])
  }

  const removeMedia = (index: number) => {
    onMediaChange(media.filter((_, i) => i !== index))
  }

  const canAddMore = canAddPhoto || canAddVideo

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <ResponseHeader
          title="Capture photos and videos"
          description="We’ll review every photo before the requester views it."
        />

        <View style={styles.section}>
          <Text size={16} lineHeight={20} weight={600} color="grey-800">
            Your photos/video must be:
          </Text>
          <View style={styles.checklist}>
            {descriptionItems.map((item, i) => (
              <View key={i} style={styles.checkItem}>
                <CheckCircle
                  size={16}
                  color={COLORS.green[500]}
                  strokeWidth={2}
                />
                <Text size={14} lineHeight={20} color="grey-600">
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {media.length > 0 && (
          <View style={styles.mediaGrid}>
            {media.map((file, i) => (
              <View key={i} style={styles.mediaCell}>
                {file.type.startsWith('video/') ? (
                  <View style={styles.videoThumb}>
                    <Video
                      size={24}
                      color={COLORS.white}
                      style={styles.videoIcon}
                    />
                  </View>
                ) : (
                  <Image source={{ uri: file.uri }} style={styles.mediaImage} />
                )}
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeMedia(i)}
                  hitSlop={4}
                >
                  <XIcon size={12} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
            {canAddMore && (
              <Pressable
                style={({ pressed }) => [
                  styles.addMoreCell,
                  pressed && { opacity: 0.75 },
                ]}
                onPress={() => setCameraOpen(true)}
              >
                <CameraIcon size={20} color={COLORS.grey[300]} />
                <Text size={11} lineHeight={14} color="grey-300" align="center">
                  Add more
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {media.length <= 0 && (
          <Button
            label="Open camera"
            icon={
              <CameraIcon
                size={18}
                color={canAddMore ? COLORS.white : COLORS.grey[300]}
              />
            }
            alignIcon="left"
            onPress={() => setCameraOpen(true)}
            disabled={!canAddMore}
          />
        )}
        <Text size={12} lineHeight={18} color="grey-300" align="center">
          Up to {MAX_PHOTOS} photos · {MAX_VIDEOS} video
        </Text>
        {media.length > 0 && (
          <Button
            label="Continue"
            btnStyle={styles.continueBtn}
            onPress={onNext}
          />
        )}
      </View>

      <CameraModal
        visible={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onPhotoCaptured={addPhoto}
        onVideoCaptured={addVideo}
        canAddPhoto={canAddPhoto}
        canAddVideo={canAddVideo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    rowGap: 40,
  },

  section: { rowGap: 10 },
  checklist: { rowGap: 10 },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 10,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  mediaCell: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'visible',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.grey[50],
  },
  videoThumb: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: COLORS.grey[800],
    alignItems: 'center',
    justifyContent: 'center',
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
  videoIcon: {
    position: 'absolute',
  },
  addMoreCell: {
    width: '30%',
    height: 100,
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.grey[100],
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 4,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.grey[50],
    backgroundColor: COLORS.white,
    rowGap: 10,
  },
  continueBtn: {
    borderWidth: 1.5,
    borderColor: COLORS.grey[50],
  },
})
