import { StyleSheet, View } from 'react-native'
import { isValidElement, ReactNode } from 'react'
import { ActivityIndicator, Modal, Portal } from 'react-native-paper'

import { COLORS } from '@/constants/theme'

import Text from './text'
import { ScreenLoaderProps } from './components.types'

const ScreenLoader = ({ isLoading, content }: ScreenLoaderProps) => {
  return (
    <Portal>
      <Modal visible={isLoading} contentContainerStyle={styles.modalContent}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color={COLORS.primary[500]} />
          {isValidElement(content) ? (
            content
          ) : (
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
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#0000001A',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    borderRadius: 12,
    width: '100%',
    rowGap: 12,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
})

export default ScreenLoader
