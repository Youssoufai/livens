import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Image } from 'expo-image'
import { useCallback, useState } from 'react'
import { EllipsisVertical } from 'lucide-react-native'

import { ThemedView } from '@/components/themed-view'
import Text from '@/components/text'
import { useGetResponseStatus } from '@/hooks/queries/use-requests'
import { envConfig } from '@/utils/config'
import FullScreenModal from '@/components/ui/modal'
import { COLORS } from '@/constants/theme'
import { useDeviceFiles } from '@/hooks/use-device-files'
import { showToastMessage } from '@/components/notification'
import { ActivityIndicator } from 'react-native-paper'

const UploadedImage = () => {
  const queryParams = useLocalSearchParams<{ id: string }>()

  const [selectedImage, setSelectedImage] = useState('')
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [option, setOption] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { saveFile } = useDeviceFiles()

  const { data: responseStatusData } = useGetResponseStatus(queryParams.id)

  const viewImage = useCallback((url: string) => {
    setSelectedImage(url)
  }, [])

  const dismissModal = () => {
    setSelectedImage('')
  }

  const selectOption = (value: string) => {
    setOption(value)
    setIsOptionsOpen(false)
  }

  const handleImageSave = async () => {
    setIsLoading(true)
    setIsOptionsOpen(false)
    const value = await saveFile(selectedImage)

    if (value?.length) {
      showToastMessage('Saved successfully', 'success')

      setTimeout(() => {
        setSelectedImage('')
      }, 2000)
    }
    setIsLoading(false)
  }

  return (
    <>
      <ThemedView style={styles.container}>
        <Text size={24} lineHeight={28} weight={700} color="black">
          Uploaded Content
        </Text>
        <FlatList
          data={responseStatusData?.response.media_paths}
          numColumns={2}
          keyExtractor={(_, index) => `uploaded_images_${index}`}
          renderItem={({ item, index }) => {
            const imageUrl = envConfig.imageBaseUrl + item

            return (
              <TouchableOpacity
                key={`request_media_${index}`}
                activeOpacity={0.75}
                onPress={() => viewImage(imageUrl)}
                style={styles.imageWrapper}
              >
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.image}
                  priority="high"
                />
              </TouchableOpacity>
            )
          }}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.contentContainer}
        />
      </ThemedView>
      <FullScreenModal
        visible={!!selectedImage}
        contentStyle={styles.modalContainer}
        statusBarStyle="light"
        onDismiss={dismissModal}
      >
        <View style={styles.modalContent}>
          <View style={styles.moreAction}>
            {!isOptionsOpen ? (
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
            )}
          </View>

          <View style={styles.modalImgWrapper}>
            <Image
              source={{ uri: selectedImage }}
              priority="high"
              contentFit="fill"
              style={styles.modalImage}
            />
          </View>
        </View>
        {isLoading && (
          <View style={[styles.loaderWrapper, StyleSheet.absoluteFill]}>
            <ActivityIndicator size={75} color={COLORS.yellow[500]} />
          </View>
        )}
      </FullScreenModal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
    paddingTop: 24,
  },
  contentContainer: {
    rowGap: 12,
  },
  columnWrapper: {
    columnGap: 12,
  },
  imageWrapper: {
    flex: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    height: 200,
  },
  modalContainer: {
    backgroundColor: COLORS.black,
    position: 'relative',
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

export default UploadedImage
