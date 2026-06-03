import { StyleSheet, View } from 'react-native'
import { isValidElement, ReactNode } from 'react'
import { ActivityIndicator, Portal } from 'react-native-paper'
import { Modal } from 'react-native'

import { COLORS } from '@/constants/theme'

import Text from './text'
import { ScreenLoaderProps } from './components.types'

const ScreenLoader = ({ isLoading, content }: ScreenLoaderProps) => {
  return (
    <Portal>
      <Modal
        visible={isLoading}
        backdropColor="#0000001A"
        style={styles.modalContent}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <ActivityIndicator size={45} color={COLORS.primary[500]} />
            {isValidElement(content) ? (
              content
            ) : !content ? null : (
              <Text
                size={16}
                lineHeight={20}
                color="grey-700"
                align="center"
                weight={600}
              >
                {content}
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
  },
  content: {
    backgroundColor: COLORS.white,
    rowGap: 12,
    paddingVertical: 24,
    borderRadius: 12,
    width: '100%',
  },
})

export default ScreenLoader
