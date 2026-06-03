import { Image } from 'expo-image'
import { Pressable, StyleSheet, View } from 'react-native'
import { Camera } from 'react-native-vision-camera'
import { useState } from 'react'
import ReactNativeModal from 'react-native-modal'

import AddPhotoIcon from '@/assets/icons/add-photo.svg'
import { COLORS } from '@/constants/theme'
import useDeviceImages from '@/hooks/use-device-image'
import { showToastMessage } from '@/components/notification'
import { handleErrorInstances } from '@/utils/error-handlers'

import { ProfilePhotoProps } from '../profile.types'

const ProfilePhoto = ({ setImage, image }: ProfilePhotoProps) => {
  const { uploadImg } = useDeviceImages('single')

  const openCamera = async () => {
    try {
      const image = await uploadImg()

      image && setImage(image)
    } catch (error) {
      showToastMessage(handleErrorInstances(error), 'error')
    }
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
      {/* <ReactNativeModal isVisible={isModalVisible} style={styles.cameraModal}>
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
      </ReactNativeModal> */}
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
