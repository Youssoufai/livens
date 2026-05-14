import { View, StyleSheet } from 'react-native'
import Button from '@/components/ui/button'

const BoostContent = ({ onDismissModal }: { onDismissModal: VoidFunction }) => {
  const handleBoostClaim = () => {
    onDismissModal()
  }

  return (
    <View style={styles.container}>
      <Button label="Claim boost" onPress={handleBoostClaim} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default BoostContent
