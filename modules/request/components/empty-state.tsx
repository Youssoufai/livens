import { StyleSheet, View } from 'react-native'

import Button from '@/components/ui/button'
import Text from '@/components/text'

import { RequestEmptyStateProps } from '../requests.types'

const EmptyState = ({
  title,
  description,
  icon,
  buttonLabel,
  onPress,
}: RequestEmptyStateProps) => {
  return (
    <View style={styles.container}>
      {icon}
      <View style={styles.textWrapper}>
        <Text
          size={20}
          lineHeight={24}
          weight={600}
          align="center"
          color="black"
        >
          {title}
        </Text>
        <Text
          size={16}
          lineHeight={24}
          weight={400}
          align="center"
          color="grey-400"
        >
          {description}
        </Text>
      </View>
      {buttonLabel && (
        <Button
          label={buttonLabel}
          btnStyle={styles.button}
          onPress={() => onPress?.()}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    rowGap: 24,
    alignItems: 'center',
  },
  textWrapper: {
    rowGap: 8,
  },
  button: {
    width: 195,
    marginTop: 16,
  },
})

export default EmptyState
