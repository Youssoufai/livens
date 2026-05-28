import { Image } from 'expo-image'
import { Pressable, StyleSheet, View } from 'react-native'
import { Camera } from 'react-native-vision-camera'
import { useState } from 'react'
import ReactNativeModal from 'react-native-modal'

import AddPhotoIcon from '@/assets/icons/add-photo.svg'
import { COLORS } from '@/constants/theme'
import useCamera from '@/hooks/use-camera'

import { ProfilePhotoProps } from '../profile.types'

const ProfilePhoto = ({ setImage, image }: ProfilePhotoProps) => {
  const {
    cameraRef,
    device,
    photoOutput,
    takePicture,
    hasPermission,
    requestPermission,
  } = useCamera()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const openCamera = async () => {
    if (!hasPermission) {
      const granted = await requestPermission()
      if (!granted) return
    }
    setIsModalVisible(true)
  }

  const handlePhotoUpdate = async () => {
    const photo = await takePicture()

    if (!photo) return

    setImage(photo)
    setIsModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={image ? { uri: image } : undefined}
          placeholder={require('@/assets/images/profile-avatar.png')}
          style={styles.image}
        />
        <Pressable style={styles.cameraWrapper} onPress={openCamera}>
          <AddPhotoIcon />
        </Pressable>
      </View>
      <ReactNativeModal isVisible={isModalVisible} style={styles.cameraModal}>
        {device && (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={device}
            isActive={isModalVisible}
            outputs={[photoOutput]}
          />
        )}
        <Pressable style={styles.captureButton} onPress={handlePhotoUpdate} />
      </ReactNativeModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  content: {
    width: 85,
    height: 85,
    borderRadius: 9999,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
  cameraWrapper: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: 40,
    height: 40,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    elevation: 4,
    shadowOffset: { width: 1, height: 2 },
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 0,
  },
  cameraModal: {
    padding: 0,
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 9999,
    backgroundColor: COLORS.white,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
})

export default ProfilePhoto
