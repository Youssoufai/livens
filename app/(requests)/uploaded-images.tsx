import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Image } from 'expo-image'
import { useCallback, useState } from 'react'
import { Video as VideoIcon } from 'lucide-react-native'

import { ThemedView } from '@/components/themed-view'
import Text from '@/components/text'
import { useGetResponseStatus } from '@/hooks/queries/use-requests'
import { COLORS } from '@/constants/theme'
import { MediaType } from '@/services/requests/request.types'
import MediaDisplay from '@/components/media-display'

const UploadedImage = () => {
  const queryParams = useLocalSearchParams<{ id: string }>()

  const [selectedImage, setSelectedImage] = useState<MediaType | null>(null)

  const { data: responseStatusData } = useGetResponseStatus(queryParams.id)

  const viewImage = useCallback((file: MediaType) => {
    setSelectedImage(file)
  }, [])

  const dismissModal = () => {
    setSelectedImage(null)
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
            if (item?.url?.endsWith('mp4')) {
              return (
                <TouchableOpacity
                  key={`request_media_${index}`}
                  activeOpacity={0.75}
                  onPress={() => viewImage(item)}
                  style={styles.imageWrapper}
                >
                  <Image
                    key={item.public_id}
                    source={{ uri: item.url }}
                    style={styles.image}
                  />
                  <VideoIcon
                    size={24}
                    color={COLORS.white}
                    style={styles.videoIcon}
                  />
                </TouchableOpacity>
              )
            }

            return (
              <TouchableOpacity
                key={`request_media_${index}`}
                activeOpacity={0.75}
                onPress={() => viewImage(item)}
                style={styles.imageWrapper}
              >
                <Image
                  source={{ uri: item.url }}
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
      <MediaDisplay selectedMedia={selectedImage} onDismiss={dismissModal} />
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
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    width: '100%',
  },
  videoIcon: {
    position: 'absolute',
  },
})

export default UploadedImage
