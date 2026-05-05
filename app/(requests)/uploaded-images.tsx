import { FlatList, StyleSheet, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Image } from 'expo-image'

import { ThemedView } from '@/components/themed-view'
import Text from '@/components/text'
import { useGetResponseStatus } from '@/hooks/queries/use-requests'
import { envConfig } from '@/utils/config'

const UploadedImage = () => {
  const queryParams = useLocalSearchParams<{ id: string }>()

  const { data: responseStatusData } = useGetResponseStatus(queryParams.id)

  return (
    <ThemedView>
      <Text>Uploaded Content</Text>
      <FlatList
        data={responseStatusData?.media_paths}
        numColumns={2}
        keyExtractor={(_, index) => `uploaded_images_${index}`}
        renderItem={({ item }) => (
          <Image
            source={{ uri: envConfig.imageBaseUrl + item }}
            style={styles.image}
            priority="high"
          />
        )}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 24,
  },
  contentContainer: {
    rowGap: 12,
  },
  columnWrapper: {
    columnGap: 12,
  },
  image: {
    flex: 1,
    height: 200,
    borderRadius: 4,
  },
})

export default UploadedImage
