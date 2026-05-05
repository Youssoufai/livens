import { StyleSheet, View } from 'react-native'

import FullScreenModal from './ui/modal'
import Text from './text'
import { SuccessModalProps } from './components.types'

const SuccessModal = ({
  isOpen,
  title,
  description,
  onDismiss,
  icon,
  contentStyle,
  bottomContent,
}: SuccessModalProps) => {
  return (
    <FullScreenModal visible={isOpen} showCloseButton onDismiss={onDismiss}>
      <View style={styles.container}>
        <View style={[styles.modalContent, contentStyle]}>
          {icon}
          <View style={styles.modalText}>
            <Text
              size={28}
              lineHeight={32}
              color="black"
              weight={700}
              align="center"
            >
              {title}
            </Text>
            <Text size={16} lineHeight={24} color="black" align="center">
              {description}
            </Text>
          </View>
        </View>
        {bottomContent}
      </View>
    </FullScreenModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  modalContent: {
    flex: 1,
    paddingTop: 90,
    alignItems: 'center',
    rowGap: 40,
  },
  modalText: {
    rowGap: 12,
  },
})

export default SuccessModal
