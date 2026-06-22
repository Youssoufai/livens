import { Pressable, StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { EllipsisVertical } from 'lucide-react-native'
import { ActivityIndicator } from 'react-native-paper'
import { Image } from 'expo-image'

import { COLORS } from '@/constants/theme'
import { useDeviceFiles } from '@/hooks/use-device-files'

import FullScreenModal from './ui/modal'
import Video from './video'
import Text from './text'
import { MediaDisplayProps } from './components.types'
import { showToastMessage } from './notification'

const MediaDisplay = ({
  selectedMedia,
  canSaveMedia = true,
  onDismiss,
}: MediaDisplayProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { saveFile } = useDeviceFiles()

  const handleImageSave = async () => {
    setIsLoading(true)
    setIsOptionsOpen(false)

    if (!selectedMedia?.url) return

    const value = await saveFile(
      selectedMedia?.url,
      selectedMedia.url.endsWith('mp4') ? 'mp4' : 'jpg'
    )

    if (value?.length) {
      showToastMessage('Saved successfully', 'success')

      setTimeout(() => {
        onDismiss()
      }, 2000)
    }
    setIsLoading(false)
  }

  if (!selectedMedia) return

  return (
    <FullScreenModal
      visible={!!selectedMedia}
      contentStyle={styles.modalContainer}
      statusBarStyle="light"
      onDismiss={onDismiss}
    >
      <View style={styles.modalContent}>
        <View style={styles.moreAction}>
          {canSaveMedia ? (
            !isOptionsOpen ? (
              <Pressable
                style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
                onPress={() => setIsOptionsOpen(true)}
              >
                <EllipsisVertical size={24} color={COLORS.white} />
              </Pressable>
            ) : (
              <Pressable
                style={({ pressed }) => [
                  styles.option,
                  { opacity: pressed ? 0.75 : 1 },
                ]}
                onPress={handleImageSave}
              >
                <Text lineHeight={20} weight={600} color="grey-700">
                  Save to camera roll
                </Text>
              </Pressable>
            )
          ) : null}
        </View>

        <View style={styles.modalImgWrapper}>
          {selectedMedia?.url?.endsWith('mp4') ? (
            <Video
              source={selectedMedia?.url}
              allowFullScreen
              style={styles.modalImage}
            />
          ) : (
            <Image
              source={{ uri: selectedMedia?.url }}
              priority="high"
              contentFit="fill"
              style={styles.modalImage}
            />
          )}
        </View>
      </View>
      {isLoading && (
        <View style={[styles.loaderWrapper, StyleSheet.absoluteFill]}>
          <ActivityIndicator size={75} color={COLORS.yellow[500]} />
        </View>
      )}
      {isOptionsOpen && (
        <Pressable
          onPress={() => setIsOptionsOpen(false)}
          style={[StyleSheet.absoluteFill, styles.backdrop]}
        />
      )}
    </FullScreenModal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.black,
    position: 'relative',
  },
  backdrop: {
    backgroundColor: '#00000041',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    rowGap: 24,
    position: 'relative',
  },
  modalImgWrapper: {
    height: '80%',
    paddingTop: 48,
  },
  modalImage: {
    height: '100%',
  },
  moreAction: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: '10%',
    zIndex: 10,
  },
  option: {
    backgroundColor: COLORS.white,
    padding: 16,
  },
  loaderWrapper: {
    backgroundColor: '#00000061',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MediaDisplay
