import { XIcon } from 'lucide-react-native'
import { PropsWithChildren } from 'react'
import {
  Modal as BasicModal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import RNModal from 'react-native-modal'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Toaster } from 'sonner-native'

import { COLORS } from '@/constants/theme'

import ScrollView from '../scrollview'
import Text from '../text'
import Button from './button'
import { Modalprops } from './ui.types'
import { toastOptions } from '../notification'

export const Modal = ({
  isVisible,
  onDismiss,
  children,
}: PropsWithChildren<{ isVisible: boolean; onDismiss: VoidFunction }>) => {
  if (!isVisible) return null

  return (
    <SafeAreaProvider>
      <BasicModal
        visible={isVisible}
        animationType="none"
        transparent
        onDismiss={onDismiss}
      >
        <View style={styles.basicModalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text size={22} weight={700} color="primary-500">
                Select Date
              </Text>
              <Pressable
                style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
                onPress={onDismiss}
              >
                <XIcon size={24} color={COLORS.primary[500]} />
              </Pressable>
            </View>
            <View>{children}</View>
          </View>
        </View>
      </BasicModal>
    </SafeAreaProvider>
  )
}

const FullScreenModal = ({
  visible,
  contentStyle,
  fullHeight,
  showCloseButton,
  statusBarStyle,
  onDismiss,
  children,
}: PropsWithChildren<Modalprops>) => {
  const { top, bottom } = useSafeAreaInsets()

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <RNModal
        isVisible={visible}
        style={styles.modal}
        onDismiss={onDismiss}
        backdropColor={'#00000099'}
        animationIn="fadeIn"
        animationInTiming={350}
        animationOutTiming={250}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        propagateSwipe
        coverScreen={fullHeight}
        onSwipeComplete={onDismiss}
        onBackButtonPress={onDismiss}
      >
        <View
          style={[
            styles.modalContainer,
            { paddingTop: top, paddingBottom: bottom + 40 },
            contentStyle,
          ]}
        >
          {showCloseButton && (
            <TouchableOpacity
              style={[styles.closeBtn, { top: top + 10 }]}
              hitSlop={6}
              onPress={onDismiss}
            >
              <XIcon size={24} />
            </TouchableOpacity>
          )}
          <ScrollView>
            <View style={styles.content}>{children}</View>
          </ScrollView>
        </View>
        <Toaster toastOptions={toastOptions} />
      </RNModal>
    </>
  )
}

const styles = StyleSheet.create({
  basicModalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    paddingVertical: 25,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderColor: COLORS.primary[500],
  },
  modal: {
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    position: 'relative',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: 10,
    right: 8,
    position: 'absolute',
    zIndex: 1000,
  },
  content: {
    flex: 1,
    paddingTop: 24,
  },
  buttonWrapper: {
    paddingTop: 10,
    rowGap: 12,
  },
})

export default FullScreenModal
