import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera } from 'react-native-vision-camera'
import { Flashlight, FlashlightOff, XIcon } from 'lucide-react-native'

import { ActivityIndicator, Portal } from 'react-native-paper'

import Text from '@/components/text'
import { MAX_RECORDING_SESSION } from '@/constants'
import { COLORS } from '@/constants/theme'
import useCamera from '@/hooks/use-camera'

import { CameraModalProps } from '../offers.types'
import { styles } from '@/styles/redirectStyle'

function CameraModal({
  visible,
  onClose,
  onPhotoCaptured,
  onVideoCaptured,
  canAddPhoto,
  canAddVideo,
}: CameraModalProps) {
  const {
    cameraRef,
    device,
    photoOutput,
    videoOutput,
    hasPermission,
    requestPermission,
    hasMicPermission,
    requestMicPermission,
    recording,
    capturing,
    compressing,
    media,
    takePicture,
    startRecording,
    stopRecording,
  } = useCamera()

  const [mode, setMode] = useState<'photo' | 'video'>('photo')
  const [torch, setTorch] = useState<'on' | 'off'>()
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraStarted, setCameraStarted] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  const closingCameraRef = useRef(false)
  const recordingStarted = useRef(false)

  const cameraActive = visible && hasPermission && !!device

  const safelyCloseCamera = useCallback(async () => {
    if (closingCameraRef.current) return

    closingCameraRef.current = true

    try {
      setTorch('off')

      await new Promise<void>((resolve) => setTimeout(resolve, 150))

      onClose()
    } finally {
      closingCameraRef.current = false
    }
  }, [onClose])

  useEffect(() => {
    if (!recording) {
      setElapsed(0)
      return
    }
    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 100
        if (next >= MAX_RECORDING_SESSION) {
          stopRecording()
          return MAX_RECORDING_SESSION
        }
        return next
      })
    }, 100)
    return () => clearInterval(interval)
  }, [recording])

  useEffect(() => {
    if (!recordingStarted.current) return
    if (!compressing && media?.type.startsWith('video/')) {
      recordingStarted.current = false
      onVideoCaptured(media)
      safelyCloseCamera()
    }
  }, [compressing, media, onVideoCaptured, safelyCloseCamera])

  const handleShutter = async () => {
    if (closingCameraRef.current) return

    if (mode === 'photo') {
      const captured = await takePicture()
      if (captured) {
        onPhotoCaptured(captured)
        await safelyCloseCamera()
      }
      return
    }

    if (recording) {
      await stopRecording()
    } else {
      recordingStarted.current = true
      await startRecording()
    }
  }

  const shutterDisabled =
    capturing ||
    compressing ||
    (mode === 'photo' ? !canAddPhoto : !canAddVideo && !recording)

  const formatTime = (ms: number) => {
    const total = Math.floor(ms / 1000)
    const m = Math.floor(total / 60)
    const s = total % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const TorchIcon = torch === 'on' ? Flashlight : FlashlightOff

  return (
    <Portal>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            zIndex: visible ? 1000 : -1,
            opacity: visible ? 1 : 0,
          },
        ]}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        <View style={cam.container}>
          {!hasPermission || !hasMicPermission ? (
            <SafeAreaView style={cam.permissionBox}>
              <Text size={15} color="white" align="center">
                Camera and microphone access are needed to capture photos and
                videos.
              </Text>
              <TouchableOpacity
                style={cam.grantBtn}
                onPress={async () => {
                  if (!hasPermission) await requestPermission()
                  if (!hasMicPermission) await requestMicPermission()
                }}
              >
                <Text size={15} weight={600} color="white">
                  Grant Permission
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          ) : device ? (
            <>
              <SafeAreaView style={cam.topBar} edges={['top']}>
                <Pressable
                  onPress={safelyCloseCamera}
                  style={({ pressed }) => [
                    cam.iconBtn,
                    pressed && { opacity: 0.75 },
                  ]}
                >
                  <XIcon size={24} color={COLORS.white} />
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    cam.iconBtn,
                    pressed && { opacity: 0.75 },
                  ]}
                  onPress={() => setTorch((t) => (t === 'on' ? 'off' : 'on'))}
                >
                  <TorchIcon size={24} color={COLORS.white} />
                </Pressable>
              </SafeAreaView>
              {device && (
                <Camera
                  ref={cameraRef}
                  style={[!visible && { opacity: 0 }, cam.camera]}
                  device={device}
                  isActive={cameraActive}
                  outputs={[photoOutput, videoOutput]}
                  torchMode={cameraActive && cameraStarted ? torch : undefined}
                  orientationSource="device"
                  enableNativeZoomGesture
                  enableNativeTapToFocusGesture
                  onConfigured={() => setCameraReady(true)}
                  onStarted={() => setCameraStarted(true)}
                  onStopped={() => {
                    setCameraStarted(false)
                  }}
                  onError={(error) => console.error('Camera error:', error)}
                />
              )}
              <View style={cam.bottomBar}>
                <View style={cam.modeTabs}>
                  <Pressable
                    onPress={() => !recording && setMode('photo')}
                    style={cam.modeTab}
                  >
                    <Text
                      size={14}
                      weight={mode === 'photo' ? 600 : 400}
                      color={mode === 'photo' ? 'primary-500' : 'white'}
                    >
                      Photo
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => !recording && setMode('video')}
                    style={cam.modeTab}
                  >
                    <Text
                      size={14}
                      weight={mode === 'video' ? 600 : 400}
                      color={mode === 'video' ? 'primary-500' : 'white'}
                    >
                      Video
                    </Text>
                  </Pressable>
                </View>

                {recording && (
                  <Text size={13} color="white">
                    {formatTime(elapsed)} / {formatTime(MAX_RECORDING_SESSION)}
                  </Text>
                )}

                <Pressable
                  onPress={handleShutter}
                  style={[
                    cam.shutterOuter,
                    shutterDisabled && cam.shutterDisabled,
                  ]}
                  disabled={shutterDisabled}
                >
                  <View
                    style={[
                      cam.shutterInner,
                      recording && cam.shutterRecording,
                    ]}
                  />
                </Pressable>
              </View>
            </>
          ) : null}

          {compressing && (
            <View style={cam.compressingOverlay}>
              <View style={cam.compressingCard}>
                <ActivityIndicator size={45} color={COLORS.primary[500]} />
                <Text
                  size={16}
                  lineHeight={20}
                  color="grey-700"
                  align="center"
                  weight={600}
                >
                  Please hold on...
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </Portal>
  )
}

const cam = StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
  },
  container: { flex: 1, justifyContent: 'flex-end', backgroundColor: '#000' },
  permissionBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    rowGap: 20,
  },
  grantBtn: {
    backgroundColor: COLORS.primary[500],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  camera: { flex: 1, zIndex: 5 },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  iconBtn: { padding: 6 },
  bottomBar: {
    paddingBottom: 48,
    paddingTop: 16,
    alignItems: 'center',
    backgroundColor: '#000000',
    rowGap: 20,
  },
  modeTabs: {
    flexDirection: 'row',
    columnGap: 24,
  },
  modeTab: { paddingVertical: 4 },
  shutterOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#fff',
  },
  shutterRecording: {
    backgroundColor: COLORS.red[500],
    borderRadius: 8,
    width: 28,
    height: 28,
  },
  shutterDisabled: { opacity: 0.4 },
  compressingOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000001a',
    paddingHorizontal: 16,
  },
  compressingCard: {
    backgroundColor: COLORS.white,
    rowGap: 12,
    paddingVertical: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
})

export default CameraModal
