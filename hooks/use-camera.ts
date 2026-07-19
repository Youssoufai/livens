import { useRef, useState } from 'react'
import {
  CommonResolutions,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
  usePhotoOutput,
  useVideoOutput,
} from 'react-native-vision-camera'
import type { CameraRef, Recorder } from 'react-native-vision-camera'
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'
import { Paths, File } from 'expo-file-system'
import { Video } from 'react-native-compressor'
import { Platform } from 'react-native'

import { AuthenticatedAPI } from '@/services'
import { MAX_RECORDING_SESSION, OPTIMAL_VIDEO_BITRATE } from '@/constants'
import { showToastMessage } from '@/components/notification'

export default function useCamera() {
  const { hasPermission, requestPermission } = useCameraPermission()
  const {
    hasPermission: hasMicPermission,
    requestPermission: requestMicPermission,
  } = useMicrophonePermission()
  const device = useCameraDevice('back')

  const photoOutput = usePhotoOutput({
    targetResolution: CommonResolutions.FHD_4_3,
    qualityPrioritization: 'speed',
    quality: 0.7,
    containerFormat: 'jpeg',
  })
  const videoOutput = useVideoOutput({
    enableAudio: true,
    targetBitRate: OPTIMAL_VIDEO_BITRATE,
    targetResolution: CommonResolutions.FHD_4_3,
    enableHigherResolutionCodecs: false,
  })

  const [recording, setRecording] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [media, setMedia] = useState<FileType | null>(null)
  const [uploading, setUploading] = useState(false)
  const [mediaUrl, setMediaUrl] = useState<string | null>(null)

  const cameraRef = useRef<CameraRef>(null)
  const recorderRef = useRef<Recorder | null>(null)

  const takePicture = async (): Promise<FileType | null> => {
    photoOutput.outputOrientation = 'right'
    const photo = await photoOutput.capturePhoto({}, {})
    const path = await photo.saveToTemporaryFileAsync()
    photo.dispose()

    const context = ImageManipulator.manipulate(path).rotate(
      Platform.select({ ios: -90, android: 90, default: 0 })
    )

    const renderedImage = await context.renderAsync()
    const result = await renderedImage.saveAsync({
      format: SaveFormat.PNG,
    })

    const uri = result.uri

    const name = uri.split('/').pop() ?? 'photo.jpeg'
    const file: FileType = {
      uri,
      name,
      type: `image/${name.split('.').pop() ?? 'jpeg'}`,
    }
    setMedia(file)
    return file
  }

  const startRecording = async () => {
    if (recording) return
    if (!hasMicPermission) {
      const granted = await requestMicPermission()
      if (!granted) return
    }

    let recorder: Recorder
    try {
      if (Platform.OS === 'ios') {
        videoOutput.outputOrientation = 'up'
      }

      recorder = await videoOutput.createRecorder({
        maxDuration: MAX_RECORDING_SESSION,
      })
    } catch (error) {
      showToastMessage('Recording failed. Please try again.', 'error')
      return
    }
    recorderRef.current = recorder

    setRecording(true)

    await recorder.startRecording(
      async (filePath) => {
        setRecording(false)
        const absolutePath = filePath.startsWith('file://')
          ? filePath
          : `file://${filePath}`

        setCompressing(true)
        try {
          const compressedResult = await Video.compress(absolutePath, {
            compressionMethod: 'manual',
            bitrate: OPTIMAL_VIDEO_BITRATE,
            maxSize: 10240,
          })
          const outputPath = compressedResult.startsWith('file://')
            ? compressedResult
            : `file://${compressedResult}`

          const source = new File(outputPath)
          const dest = new File(Paths.cache, `video_${Date.now()}.mp4`)
          source.move(dest)

          new File(absolutePath).delete()

          const uri = dest.uri
          const name = dest.name

          setMedia({ uri, name, type: 'video/mp4' })
        } finally {
          setCompressing(false)
        }
      },
      (error) => {
        const message = error.message.includes('Disk Full')
          ? 'Not enough storage space to record video. Free up some space and try again.'
          : 'Recording failed. Please try again.'
        showToastMessage(message, 'error')

        setRecording(false)
      }
    )
  }

  const stopRecording = async () => {
    await recorderRef.current?.stopRecording()
  }

  const uploadMedia = async (file: FileType = media!, endpoint: string) => {
    if (!file?.uri) return null

    const form = new FormData()
    form.append('file', file as any)

    setUploading(true)
    try {
      const { data } = await AuthenticatedAPI.post(endpoint, form, {
        transformRequest: (data) => data,
      })
      const url: string = data?.data?.url ?? data?.url
      setMediaUrl(url)
      return url
    } finally {
      setUploading(false)
    }
  }

  return {
    cameraRef,
    device,
    photoOutput,
    videoOutput,
    hasPermission,
    requestPermission,
    hasMicPermission,
    requestMicPermission,
    recording,
    compressing,
    media,
    uploading,
    mediaUrl,
    takePicture,
    startRecording,
    stopRecording,
    uploadMedia,
  }
}
