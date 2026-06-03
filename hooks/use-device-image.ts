import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'
import {
  launchImageLibraryAsync,
  useMediaLibraryPermissions,
} from 'expo-image-picker'
import { useCallback, useState } from 'react'

const compressImage = async (uri: string) => {
  if (!uri) return

  const imageContext = ImageManipulator.manipulate(uri)
  imageContext.resize({ width: 800 })

  const result = await imageContext.renderAsync()

  const compressed = await result.saveAsync({
    compress: 0.6,
    format: SaveFormat.JPEG,
  })

  return compressed
}

export default function useDeviceImages(type: 'single' | 'multiple') {
  const [images, setImages] = useState<FileType[]>([])
  const [status, requestPermission] = useMediaLibraryPermissions()

  const uploadImg = useCallback(async () => {
    if (!status) {
      return
    }
    const response = await requestPermission()

    if (response.granted) {
      const result = await launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      })

      if (!result.canceled) {
        if (type === 'single') {
          const image = await compressImage(result.assets[0].uri)

          // const url = `data:image/jpeg;base64,${image?.uri}`;
          const asset = result.assets[0]
          const imageFile = {
            uri: image?.uri || '',
            type: asset.mimeType || '',
            name: asset.fileName || '',
          }

          setImages((prevImgs) => [imageFile, ...prevImgs])
          return imageFile
        } else {
          for (let asset of result.assets) {
            const image = await compressImage(asset.uri)
            const imageFile = {
              uri: image?.uri || '',
              type: asset.mimeType || '',
              name: asset.fileName || '',
            }

            setImages((prevImgs) => [...prevImgs, imageFile])

            return imageFile
          }
        }
      }
    }
  }, [status, requestPermission])

  const removeImgFile = (img: string) => {
    setImages((currImgs) => currImgs.filter((item) => item.uri !== img))
  }

  return { images, uploadImg, removeImgFile }
}
