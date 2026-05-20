import { CameraView, useCameraPermissions } from 'expo-camera'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Lightbulb, Camera, MapPin, ImagePlus, Clock } from 'lucide-react-native'

import Text from '@/components/text'
import Button from '@/components/ui/button'
import api from '@/lib/api'
import { COLORS } from '@/constants/theme'

const CAPTURE_ICONS = [Camera, MapPin, Clock, ImagePlus]

// ─── Fullscreen camera modal ──────────────────────────────────────────────────
function CameraModal({ visible, requestId, onClose, onCapture }) {
  const cameraRef = useRef(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [facing, setFacing] = useState('back')
  const [mode, setMode] = useState('photo')
  const [permission, requestPermission] = useCameraPermissions()

  const handleShutter = async () => {
    if (!cameraRef.current || !cameraReady) return
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.85 })
    onCapture(photo.uri)
  }

  return (
    <Modal visible={visible} animationType="fade" statusBarTranslucent>
      <View style={cam.container}>
        {!permission?.granted ? (
          <SafeAreaView style={cam.permissionBox}>
            <Text size={15} color="white" align="center">
              Camera access is needed to capture photos.
            </Text>
            <TouchableOpacity style={cam.grantBtn} onPress={requestPermission}>
              <Text size={15} weight={600} color="white">
                Grant Permission
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        ) : (
          <>
            <CameraView
              ref={cameraRef}
              style={cam.camera}
              facing={facing}
              onCameraReady={() => setCameraReady(true)}
            />

            {/* Top overlay */}
            <SafeAreaView style={cam.topBar} edges={['top']}>
              <TouchableOpacity onPress={onClose} style={cam.iconBtn}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
              <Text size={12} style={{ color: 'rgba(255,255,255,0.7)' }}>
                Step 2 of 4
              </Text>
              <TouchableOpacity
                style={cam.iconBtn}
                onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
              >
                <Ionicons name="camera-reverse-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </SafeAreaView>

            {/* Bottom controls */}
            <View style={cam.bottomBar}>
              <View style={cam.modeToggle}>
                <TouchableOpacity onPress={() => setMode('photo')}>
                  <Text
                    size={14}
                    weight={mode === 'photo' ? 700 : 400}
                    style={{ color: mode === 'photo' ? '#fff' : 'rgba(255,255,255,0.5)' }}
                  >
                    Photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMode('video')}>
                  <Text
                    size={14}
                    weight={mode === 'video' ? 700 : 400}
                    style={{ color: mode === 'video' ? '#fff' : 'rgba(255,255,255,0.5)' }}
                  >
                    Video
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={handleShutter}
                style={[cam.shutterBtn, !cameraReady && cam.shutterDisabled]}
                disabled={!cameraReady}
              />
            </View>
          </>
        )}
      </View>
    </Modal>
  )
}

// ─── Instructions screen ──────────────────────────────────────────────────────
export default function CaptureContent() {
  const { request_id } = useLocalSearchParams()
  const [request, setRequest] = useState(null)
  const [loadingRequest, setLoadingRequest] = useState(true)
  const [cameraOpen, setCameraOpen] = useState(false)

  useEffect(() => {
    if (!request_id) { setLoadingRequest(false); return }
    api
      .get(`/get-request/${request_id}`)
      .then((res) => {
        const d = res.data?.data
        setRequest(Array.isArray(d) ? d[0] : d)
      })
      .catch(() => {})
      .finally(() => setLoadingRequest(false))
  }, [request_id])

  const handleCapture = (photoUri) => {
    setCameraOpen(false)
    router.push({
      pathname: '/requests/comment',
      params: {
        media: JSON.stringify([photoUri]),
        request_id: String(request_id),
      },
    })
  }

  if (loadingRequest) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary[500]} />
      </SafeAreaView>
    )
  }

  const rawLines = (request?.description ?? '')
    .split(/\n|•|-/)
    .map((s) => s.trim())
    .filter(Boolean)

  const instructionItems =
    rawLines.length > 1
      ? rawLines
      : [
          'Entrance or storefront',
          'Current activity or queue',
          'Any signs, boards or relevant items',
          'People in context (if applicable)',
        ]

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.grey[800]} />
        </TouchableOpacity>
        <Text size={12} color="grey-300">
          Step 1 of 4
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text size={26} lineHeight={32} weight={700} color="grey-800">
          What to capture
        </Text>
        <Text size={14} lineHeight={22} color="grey-400" style={styles.subtitle}>
          Please capture the following:
        </Text>

        <View style={styles.itemsList}>
          {instructionItems.map((item, i) => {
            const Icon = CAPTURE_ICONS[i % CAPTURE_ICONS.length]
            return (
              <View key={i} style={styles.instructionItem}>
                <View style={styles.iconCircle}>
                  <Icon size={18} color={COLORS.primary[500]} />
                </View>
                <Text size={14} lineHeight={20} color="grey-600">
                  {item}
                </Text>
              </View>
            )
          })}
        </View>

        <View style={styles.tipsBox}>
          <View style={styles.tipsHeader}>
            <Lightbulb size={16} color="#92650A" />
            <Text size={13} lineHeight={18} weight={600} style={{ color: '#92650A' }}>
              Tips
            </Text>
          </View>
          <Text size={13} lineHeight={20} style={{ color: '#92650A' }}>
            {'• Capture clear and bright photos\n• Make sure text is readable\n• Steady your hand before shooting'}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Start capture" onPress={() => setCameraOpen(true)} />
      </View>

      <CameraModal
        visible={cameraOpen}
        requestId={request_id}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCapture}
      />
    </SafeAreaView>
  )
}

// ─── Camera modal styles ──────────────────────────────────────────────────────
const cam = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  permissionBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    rowGap: 20,
  },
  grantBtn: {
    backgroundColor: COLORS.primary[500],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
  },
  camera: { flex: 1 },
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
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#000',
    rowGap: 16,
  },
  modeToggle: { flexDirection: 'row', columnGap: 24 },
  shutterBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  shutterDisabled: { opacity: 0.4 },
})

// ─── Instructions screen styles ───────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: { padding: 4 },
  content: { paddingHorizontal: 20, paddingBottom: 24, rowGap: 20 },
  subtitle: { marginTop: -8 },
  itemsList: { rowGap: 14 },
  instructionItem: { flexDirection: 'row', alignItems: 'center', columnGap: 14 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipsBox: {
    backgroundColor: COLORS.yellow[100],
    borderRadius: 12,
    padding: 14,
    rowGap: 8,
  },
  tipsHeader: { flexDirection: 'row', alignItems: 'center', columnGap: 6 },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.grey[50],
    backgroundColor: COLORS.white,
  },
})
