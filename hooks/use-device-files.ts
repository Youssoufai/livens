import { Directory, File, Paths } from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
// import * as Sharing from 'expo-sharing'
import { Platform } from 'react-native'

import {
  deviceFileErrorHandler,
  handleErrorInstances,
} from '@/utils/error-handlers'
import { showToastMessage } from '@/components/notification'

export const getFilenameFromUrl = (
  url: string,
  type: 'jpg' | 'pdf' | 'mp4' = 'jpg'
) => {
  try {
    const pathname = new URL(url).pathname
    return (
      pathname.split('/').pop() ||
      (type === 'jpg' ? 'image.jpg' : type === 'mp4' ? 'video.mp4' : 'file.pdf')
    )
  } catch {
    return `image-${Date.now()}.jpg`
  }
}

export function useDeviceFiles() {
  const saveFile = async (url: string, type: 'jpg' | 'pdf' | 'mp4' = 'jpg') => {
    const filename = getFilenameFromUrl(url, type)

    try {
      const tempUri = `${Paths.cache.uri}${filename}`

      const tempFile = new File(tempUri)

      await File.downloadFileAsync(url, tempFile)

      if (type === 'jpg' || type === 'mp4') {
        const { status } = await MediaLibrary.requestPermissionsAsync()

        if (status !== 'granted') {
          throw new Error('Media library permission denied')
        }

        await MediaLibrary.saveToLibraryAsync(tempFile.uri)

        return tempFile.uri
      }

      if (Platform.OS === 'android') {
        const pickedDirectory = await Directory.pickDirectoryAsync()

        if (!pickedDirectory) {
          throw new Error('No directory selected')
        }

        const destinationFile = new File(pickedDirectory.uri, filename)

        tempFile.copy(destinationFile)

        return destinationFile.uri
      } else {
        // const available = await Sharing.isAvailableAsync()

        // if (available) {
        //   await Sharing.shareAsync(tempPath.uri, {
        //     mimeType: 'application/pdf',
        //     dialogTitle: 'Save PDF',
        //   })
        // }

        return tempFile.uri
      }
    } catch (error) {
      showToastMessage(deviceFileErrorHandler(error), 'error')
    }
  }

  return { saveFile }
}
